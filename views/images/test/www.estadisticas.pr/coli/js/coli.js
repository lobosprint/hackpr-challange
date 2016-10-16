var TO_composite = 1;
var FROM_composite = 1;
var avgPrice = null;
var item_desc = null;
var $direction = null;
var $cities_vt = null;
var $cty_arr = null;
var ST, PR, MEAN;

$(document).ready(function () {
    $('.picframe').attr('border', '0');
    
    Showme();
    $('.fromPR').css({'font-weight': '100', 'color': 'Silver'});
    $('.toPR').css({'font-weight': '600', 'color': '#6b57a9'});

    $("#ddl_state").change(function () {
        if (this.value === "0") {
            $("#ddl_City").append($cities_vt)
                    .children
                    .sort(function (x, y) {
                        return $(x).text() < $(y).text() ? -1 : 1;
                    })
                    .val("0");
        } else {
            $("#ddl_City").append($cities_vt);
            var some_item = "." + this.value + ", .none";
            $cities_vt = $('#ddl_City option').not(some_item).remove().sort(function (x, y) {
                return $(x).text() < $(y).text() ? -1 : 1;
            });
        }
        get_city_results();
    });

    $("#ddl_state").change(function () {
        avgPrice = null;
        Showme(avgPrice);
    });

    $("#ddl_City").change(function () {
        get_city_results($(this));
    });

    $(".selFromTo").click(function () {
        $direction = $(this).attr('value');
        bolderme($direction);
        Showme(avgPrice);
    });

    $.get("datos/description.json", {
    }, function (data) {
        item_desc = data;
    });
    
    $("img").hide();
 
});


// Showme(data)
var Showme = function (data) {

    if ($('#ddl_City option:selected').text() === '-- ciudad --') {
        //clean messages
        $('#rdiff').empty();
        $('#rsalary').empty();
        $('#colitable').empty();
        $('.COLI02').empty();
        $('.COLI03').empty();

        return;
    } else {
        //show messages
        if ($direction === 'toPR' || $direction === null) {
            $('.COLI01').html("Actualmente vivo en<br />Currently I live in");
            $('.COLI02').html($('#ddl_City option:selected').text());
            $('.COLI03').html("Diferencia de precios en <br /><b>San Juan, PR</b>");
        } else {
            $('.COLI01').html("Estoy pensando mudarme a<br />I am thinking of moving to");
            $('.COLI02').html("San Juan, PR");
            $('.COLI03').html("Diferencia de precios en <br /><b>" + $('#ddl_City option:selected').text() + "</b>");
        }
    }
    if (data === null) {
        //show nothing
        return;
    }

    avgPrice = data;
    $.each(avgPrice, function (idx, obj) {
        //set objects (from, to, mean)        
        switch (obj.city_code) {
            case "7241980700": //PR
                PR = obj;
                break;
            case "-1776965": //MEAN
                MEAN = obj;
                break;
            default: //State
                ST = obj;
        }
    });

    if ($direction === 'toPR' || $direction === null) {
        //to Puerto Rico
        $cty_arr = {to: PR, from: ST, mean: MEAN, toName: "San Juan, PR", fromName: $("#ddl_City option:selected").text()};
    } else {
        //from Puerto Rico
        $cty_arr = {to: ST, from: PR, mean: MEAN, toName: $("#ddl_City option:selected").text(), fromName: "San Juan, PR"};
    }

    $('#rdiff').empty().append('<table border="0"><tbody><tr></tr>');

    var r = $('#colitable').select();
    r.empty().append('<table id="iepr_r" border="0" cellpadding="1"><tbody><tr ><td class="Doc_Title"  style="height: 25px; ">Productos y servicios</td><td class="Doc_Title">' + $cty_arr["fromName"] + '</td><td class="Doc_Title">' + $cty_arr["toName"] + '</td><td class="Doc_Title">Estados Unidos</td></tr>');

    var r_mas = $('#rdiff').select();
    var r_total = $('#rsalary').select();
    var selTO, selFROM;
    var descriptor;

//PR
    for (code in item_desc) {
        selTO = +($cty_arr["to"][code]);
        selFROM = +($cty_arr["from"][code]);
        descriptor = item_desc[code];
        switch (code) {
            case "grocery_items": //Alimentos
            case "housing": //Vivienda          
            case "transportation": //Transportación
            case "health_care": //Salud  
            case "utilities": //Utilidades
            case "misc_goods_services":
                r_mas.append('<tr><td class="st_right">' + descriptor + ':</td><td><b>' + formatPercent(((selTO - selFROM) / selFROM) * 100, 1) + ((selFROM - selTO) < 0 ? "más" : "menos") + '</b></td></tr>');
                break;

            case "composite_index":
                var value = +($('[data-rangeslider]')[0].value);
                TO_composite = selTO;
                FROM_composite = selFROM;
                r_total.html(accounting.formatMoney((((selTO - selFROM) / selFROM) * value) + Number(value), "$", 2));
                break;

            case "period":
            case "city_code":

                break;

            default:
               // $('#iepr_r').append("<tr><td id='" + code + "' onmouseover=\"$('.img_" + code + "').css({'top': event.clientY, 'left': event.clientX , 'width': 150}).show();\" onmouseout=\"$('.img_" + code + "').hide();\"  >" + descriptor + "</td><td  align='right'>" + accounting.formatMoney(selFROM, "$", 2) + "</td><td align='right'>" + accounting.formatMoney(selTO, "$", 2) + "</td><td align='right'>" + accounting.formatMoney(+($cty_arr["mean"][code]), "$", 2) + "</td></tr>");
               $('#iepr_r').append("<tr><td class='show_img' id='" + code + "' onmouseover='show_img(event,     \"" + code + "\")' onmouseout='hide_img(\"" + code + "\")'>" + descriptor + "</td><td  align='right'>" + accounting.formatMoney(selFROM, "$", 2) + "</td><td align='right'>" + accounting.formatMoney(selTO, "$", 2) + "</td><td align='right'>" + accounting.formatMoney(+($cty_arr["mean"][code]), "$", 2) + "</td></tr>");
               
        }
        $("#iepr_r tr:even").css("background-color", "#dbdbdb");
        
    }
 };
function show_img(event, img){
    var keyname = '#' + img;
    $(keyname).css( {'color': 'red'} );

    var x = event.clientX + 100;
    var y = event.clientY - 50;
    
    $('.picframe').css({'top': y + 'px', 'left': x + 'px' })
            .attr('src', 'img/' + img +  '.png')
            .attr('title', img)
            .attr('border', '1')
            .attr('width', '180')
            .removeAttr('height')
            .show();  
    
}

function hide_img(img){
      var keyname = '#' + img;
     $( keyname ).css( {'color': 'black'} );
    $(".picframe").attr('border', '0')
            .attr('src','')
            .hide();
}

// Bolderme
function bolderme(dir) {

    if (dir == 'toPR') {
        $('.fromPR').css({'font-weight': '100', 'color': 'Silver'});
        $('.toPR').css({'font-weight': '600', 'color': '#6b57a9'});
    } else {
        $('.toPR').css({'font-weight': '100', 'color': 'Silver'});
        $('.fromPR').css({'font-weight': '600', 'color': '#6b57a9'});
    }

}
// get_city_results(this)
function get_city_results() {
    var $objs = $('#ddl_City');
    var $city = $objs.val();
    $.get("datos/data_get_avgPrice.php", {
        city: $city
    }, function (data) {
        Showme(JSON.parse(data));
    });
}
;

//  formatPercent(num)
function formatPercent(num, dec) {
    return num.toFixed(dec) + '% ';
}

// data-rangeslider...
$(function () {
    var $document = $(document), selector = '[data-rangeslider]', $inputRange = $(selector);
    // Example functionality to demonstrate a value feedback
    // and change the output's value.

    function valueOutput(element) {
        var value = element.value, output = document.getElementById('js-output'), output2 = document.getElementById('rsalary');
        output.innerHTML = accounting.formatMoney(value, "$", 2);
        if (isNaN(TO_composite)) {
            output2.innerHTML = '';
        }
        else {
            output2.innerHTML = accounting.formatMoney((((TO_composite - FROM_composite) / FROM_composite) * value) + Number(value), "$", 2);
        }
        ;
    }

    for (var i = $inputRange.length - 1; i >= 0; i--) {
        valueOutput($inputRange[i]);
    }
    ;
    $document.on('change', selector, function (e) {
        valueOutput(e.target);
    });
    // Initialize the elements
    $inputRange.rangeslider({
        polyfill: false
    });
    // Example functionality to demonstrate programmatic value changes
    $document.on('click', '#js-example-change-value button', function (e) {
        var $inputRange = $('input[type="range"]', e.target.parentNode), value = $(
                'input[type="number"]', e.target.parentNode)[0].value;
        $inputRange.val(value).change();
    });

    // Example functionality to demonstrate destroy functionality
    $document.on('click', '#js-example-destroy button[data-behaviour="destroy"]', function (e) {
        $('input[type="range"]', e.target.parentNode).rangeslider('destroy');
    }).on('click', '#js-example-destroy button[data-behaviour="initialize"]', function (e) {
        $('input[type="range"]', e.target.parentNode).rangeslider({
            polyfill: false
        });
    });
});
