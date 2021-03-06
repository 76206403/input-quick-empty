/*
 * 说明:
 *      给input标签加上清空按钮
 *
 * 使用:
 *      给input标签的class加上quick-empty/quick-empty-middle/quick-empty-after之一即可
 *
 *      quick-empty: input标签为首个元素
 *      quick-empty-middle: input标签非首个或末尾元素
 *      quick-empty-after: input标签为末尾元素
 *
 * 时间:
 *      2021-07-21
 * 作者:
 *      李腾飞
 */

$().ready(function() {

    var $quickEmptyInput = $(".quick-empty, .quick-empty-middle, .quick-empty-after");
    var wrapHtml = '<div class="input-wrap" />';
    var emptyHtml = '<i class="hidden"></i>';
    var quickEmptyButtonHtml = '<a href="javascript:void(0);" onclick="cleanInput(this);" class="input-quick-empty-button"><i class="iconfont icon-close"></i></a>';

    $quickEmptyInput.wrap(wrapHtml);

    _.forEach($quickEmptyInput, function(item) {
        var $input = $(item);

        if ($input.hasClass("quick-empty")) {
            $input.after(quickEmptyButtonHtml);
        } else if ($input.hasClass("quick-empty-middle")) {
            $input.before(emptyHtml);
            $input.after(quickEmptyButtonHtml);
        } else {
            $input.before(quickEmptyButtonHtml);
            $input.parent().addClass("row-reverse");
        }

        if ($input.val().length <= 0) {
            $input.parent().find(".input-quick-empty-button").addClass("hidden");
        }
    });

    $quickEmptyInput.bind("input propertychange", function (event) {
        var $input = $(event.currentTarget);
        var $parent = $input.parent();
        var $inputQuickEmptyButton = $parent.find(".input-quick-empty-button");

        if ($input.val().length > 0) {
            $inputQuickEmptyButton.removeClass("hidden");
        } else {
            $inputQuickEmptyButton.addClass("hidden");
        }
    });

});

function cleanInput(element) {
    var $inputQuickEmptyButton = $(element);
    var $input = $inputQuickEmptyButton.prev();

    $input.val("");
    $input.change();
    $input.focus();

    $inputQuickEmptyButton.addClass("hidden");
}
