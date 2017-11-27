module.exports = new CommonUtil();

var publicationTree = require('../po/specific/publication/publicationTree.js');

function CommonUtil() {
    var that = this;
    var EC = protractor.ExpectedConditions;

    /**
     * Раскрывает ветку элементов и выделяет внутренний элемент
     * @param {string[]} nodeValues - массив из названий узлов, начиная с внешнего
     */
    that.selectBranchInnerNode = function (nodeValues) {
        var node;

        nodeValues.forEach(function (item, i) {
            node = publicationTree.getNodeElementByLevelNumberAndValue(i, item);
            browser
                .wait(
                    EC.visibilityOf(node),
                    browser.params.visibilityWaitingTime.elementDrawing,
                    item + ' is not visible.')
                .then(
                    browser
                        .actions()
                        .doubleClick(node)
                        .perform()
                );
            }
        );
    };

    /**
     * Сворачивает ветку элементов
     * @param {string[]} nodeValues - массив из названий узлов, начиная с внешнего, без внутреннего
     */
    /* TODO: closeBranch - WILL BE DELETED */
    that.closeBranch = function (nodeValues) {
        var node;
        nodeValues = nodeValues.reverse();
        nodeValues.forEach(function (item, i) {
            node = publicationTree.getNodeElementByLevelNumberAndValue(i, item);
            browser
                .actions()
                .click(node)
                .sendKeys(protractor.Key.LEFT)
                .perform();
            }
        );
    };

    /**
     * Ожидает прорисовку элемента и кликает на него
     * @param {element} element - элемент, на который необходимо нажать
     */
    that.waitVisibilityAndClick = function (element) {
        browser
            .wait(
                EC.visibilityOf(element),
                browser.params.visibilityWaitingTime.elementDrawing,
                'cant click, element is not visible.')
            .then(element.click());
    };

    /**
     * Выбирает значение для элемента в выпадающем списке, согласно направлению относительно текущего
     * @param {element} element - элемент, которому необходимо присвоить значение
     * @param {string} value - направление, относительно текущего значения в списке
     */
    that.setDropdownMenuValue = function (element, value) {        
        if (value === 'UP') {
            element.click()
                .then(function () {
                    return element.sendKeys(protractor.Key.ARROW_UP);
                })
                .then(function () {
                    return element.sendKeys(protractor.Key.ENTER);
                });
        } else if (value === 'DOWN') {
            element.click()
                .then(function () {
                    return element.sendKeys(protractor.Key.ARROW_DOWN);
                })
                .then(function () {
                    return element.sendKeys(protractor.Key.ENTER);
                });
        }
    };

    /**
     * Устанавливает значение элементу
     * @param {element} element - элемент, которому необходимо присвоить значение
     * @param {string} value - значение
     */
    that.setValue = function (element, value) {
        element.clear()
            .then(function () {
                return element.sendKeys(value);
            });
    };
}