export function  measureElement(element): { top?: number, left?: number, height?: number, width?: number } {
    const target = element;
    const target_width = target.offsetWidth;
    const target_height = target.offsetHeight;
    let rect = {};
    let gleft = 0;
    let gtop = 0;

    var moonwalk = function (_parent) {
        if (!!_parent) {
            gleft += _parent.offsetLeft;
            gtop += _parent.offsetTop;
            moonwalk(_parent.offsetParent);
        } else {
            return rect = {
                top: target.offsetTop + gtop,
                left: target.offsetLeft + gleft,
                height: target_height,
                width: target_width
            };
        }
    };
    moonwalk(target.offsetParent);
    return rect;
}