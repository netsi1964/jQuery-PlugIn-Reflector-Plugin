/*!
 * jQuery PlugIn Reflector Plugin
 * Examples and documentation at: ..
 * Copyright (c) 2011 S. Hougaard, www.netsi.dk
 * Version: 0.01 (2011-03-10)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.5 or later
 * add "plugInReflector()" to a jQuery element to reflect on internal jQuery objects.
 * Usefull to get an inside view of the possibel settings that for instance a gallery offers.
 */
;(function ($) {

  jQuery.fn.plugInReflector = function (settings) {
    var config = {
    'output': '',
    'sort': true
     };
    var oHTML = jQuery('<table cellpadding="3" cellspacing="1"></table>');

    if (settings) {
      jQuery.extend(config, settings);
    } else {
      config.output = 'plugInReflector'+(new Date()-new Date(2011,2,11));
      jQuery('body').append(jQuery('<div id="'+config.output+'"></div>'));
      config.output = '#'+config.output;
    }

    this.first().each(function () {
      var oData = jQuery(jQuery(this)).data();
      for(optionName in oData) {
        if (console) console.log('Reflecting on "'+optionName+'"');
        oHTML.append(jQuery('<tr class="optionName"><th colspan="4">'+optionName+'</th></tr>'));
        var aOptions = [];
        for(opt in oData[optionName]) {
          aOptions.push(opt);
        }

        if (config.sort) aOptions = aOptions.sort();

        relectOnOption(oData[optionName], aOptions);
      }
    });

    function relectOnOption(oOptions, aOptions) {
      var iPos = 1;
      var option = '';
      var l = aOptions.length;
      for (var i=0; i<l; i++) {
        option = aOptions[i];
        var vValue = oOptions[option];
        var sType = typeof vValue;
        if (sType == 'object') {
          // Check if it might be a function - 
          var sLower = option.toLowerCase();
          if (sLower.indexOf('on') == 0 || (vValue+'').toLowerCase().indexOf('function')==0) {
            sType = 'function';
            vValue = 'function() {\n\/\/ Enter code for "' + option + '" here\nreturn null;\n}';
          } 
        }
        var sInput;
        switch (sType) {
          case 'function':
            sInput = '<textarea>' + vValue + '</textarea>'
            break;
          case 'boolean':
            var sTemp = (vValue == true) ? '<option selected="selected">true</option><option>false</option>' : '<option>true</option><option selected="selected">false</option>'
            sInput = '<select class="' + vValue + '">' + sTemp + '</select>'
            break;
            break;
          default:
            sInput = '<input type="text" value="' + vValue + '" />';
        }

        var oInput = jQuery(sInput).addClass('value');
        var nullValue = ((vValue == '' || vValue == null) && vValue != false) ? ' class="null"' : '';

        oHTML.append(jQuery('<tr id="AnythingSlider_' + option + '"' + (nullValue) + '><td class="position">' + (iPos++) + '</td><td class="' + sType + '">' + sType + '</td><th><label for="' + option + '">' + option + '</label></th><td class="optionValue">' + oInput.outerHTML() + '</td></tr>'));
        var o = config.output;
        jQuery(config.output).html('<style>'+o+' tr.optionName {background-color: #eee; font-size: 18px;}'+o+' input {width: 300px; padding: 2px;}'+o+' td, '+o+' th {vertical-align: top; text-align: left;}'+o+' {font-size: 11px; font-family: tahoma;}'+o+' textarea {width: 300px; font-family: monospace; padding: 2px; height: 100px; font-size: 11px;}</style>').append(oHTML);
      };
    }

    return this;

  };

  jQuery.fn.outerHTML = function (s) {
    return (s)
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
  }

})(jQuery);