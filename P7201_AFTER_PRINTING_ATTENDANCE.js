setTimeout(function () {
    $('.pz-pnl-innerdiv').width($('#p7201_pz_pnl_main').width() - 15);
    if ($(window).height() > 672) {
        $('.pz-pnl-innerdiv').height($(window).height() - $('.pz-pnl-innerdiv').offset().top - 60);
        $('#p7201_att_reg').css('max-height', $(window).height() - $('.pz-pnl-innerdiv').offset().top - 60);
    }
    if ($('.pz-pnl-innerdiv').width() > 750) {
        $("#p7201_att_reg").off("scroll");
        $('.pz-pnl-tbl').tableHeadFixer({
            "left": 1,
            "head": true
        });
    } else {
        $("#p7201_att_reg").off("scroll");
        $('.pz-pnl-tbl').tableHeadFixer({
            "head": true
        });
    }
}, 10);
setTimeout(function () {
    $("tr.pz-fixed").click(function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    });
    $(document).ready(function () {
        $("img.emp_img").unveil(200);
        $("img.emp_img").trigger("unveil");
    });
}, 1);
setTimeout(function () {
    $('.sts').click(function () {
        if ($('.pz-pnl-innerdiv span.u-Processing').length == 0) {
            waiting_icon = apex.util.showSpinner('.pz-pnl-innerdiv');
        }
        if ($('.HL.' + $(this).data('val')).length == 0) {
            $('.HL').removeClass('HL').css('background-color', 'inherit');
            $('.sts.sel').css('box-shadow', 'inherit').removeClass('sel');
            $('.sts[data-val=' + $(this).data('val') + ']').addClass('sel');
            if ($(this).data('val') == 'N') {
                $('.sts.sel').css('box-shadow', '0px 0px 0px 2px #ddd');
                $('.' + $(this).data('val')).addClass('HL').css('background-color', '#ddd');
            } else {
                $('.sts.sel').css('box-shadow', '0px 0px 0px 2px ' + $(this).data('color'));
                $('.' + $(this).data('val')).addClass('HL').css('background-color', $(this).data('color'));
                $('.HL').lighten();
            }
        } else {
            $('.HL').removeClass('HL').css('background-color', 'inherit');
            $('.sts.sel').css('box-shadow', 'inherit').removeClass('sel');
        }
        if (waiting_icon) {
            waiting_icon.remove();
        }
    });
    $('#p7201_att_sts').removeClass('isDisabled');
    if (waiting_icon) {
        waiting_icon.remove();
    }
    if (vProgreeBarTimer) {
        clearInterval(vProgreeBarTimer);
        apexProgressBar('P7201_PROGRESS_BAR').setValues({
            percentage: 0
        }, {
            immediate: true
        });
        AWNSetItemValue('P7103_SUCCESSFULLY_PROCESSED', '0:Initializing...:');
        AWNSetItemValue('P7201_PROGRESS_VALUE', '0');
        AWNSetItemValue('P7201_CURRENT_PROCESS', 'Initializing...:');
        apexProgressBar('P7201_PROGRESS_BAR').hide();
    }
}, 10);
setTimeout(function () {
    $(".pz-popup").off("click");
    $(".pz-popup").on("click", function () {
        if ($(this).hasClass("active")) {
            $('.pz-popup.active').removeClass("active");
            $('.pz-popuptext.show').removeClass("show");
        } else {
            $('.pz-popup.active').removeClass("active");
            $('.pz-popuptext.show').removeClass("show");
            $(this).toggleClass("active");
            $('.pz-popup.active .pz-popuptext').toggleClass("show");
            var target = $(this);
            var tooltip = $('.pz-popuptext.show');
            var pos_top = target.offset().top - $('.pz-pnl-tbl').offset().top - tooltip.outerHeight() - $('#p7201_att_reg').scrollTop();
            if (pos_top < 0) {
                tooltip.switchClass('top', 'bottom', 0);
            } else {
                tooltip.switchClass('bottom', 'top', 0);
            }
        }
    });
    if (waiting_icon) {
        waiting_icon.remove();
    }
}, 10);
