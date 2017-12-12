"use strict";

var _ = require('lodash'),
util = require('../util/common.js'),
data = require('../data/lab-4.e2e-data.json'),

title = require('../po/common/title.js'),
popup = require('../po/common/popup.js'),
mainMenu = require('../po/common/mainMenu.js'),
publicationTree = require('../po/specific/publication/publicationTree.js'),

PublicationPopup = require('../po/specific/publication/publicationPopup.js'),
publicationPopup = new PublicationPopup(data);

describe('lab 4', function () {
    
    beforeAll(function () {
        util.loadPage();
    });
    
    it('should set title value by menu element', function () {
        mainMenu.open(data.productionsMenuSubElement);
        expect(title.getTitle()).toEqual(data.productionsMenuSubElement);
    });
    
    it('should add element', function () {
        publicationPopup.plusButton.click();
        publicationPopup.season.sendKeys(data.season);
        publicationPopup.newNumber.sendKeys(getRandomValue());
        publicationPopup.setValue(publicationPopup.type, data.testType);
        publicationPopup.setElementValue(publicationPopup.mainDate, data.mainDate);
        publicationPopup.setElementValue(publicationPopup.tradeDate, data.tradeDate);
        publicationPopup.setValue(publicationPopup.priceType, data.testPrice);
        publicationPopup.description.sendKeys(data.description);
        popup.okButton.click();
        expect(publicationTree.getNodeByText(data.addedNode).isDisplayed()).toBe(true);
    });
    
    it('should remove element', function () {
        publicationPopup.trashButton.click();
        popup.yesButton.click();
        expect(publicationTree.getNodeByText(data.addedNode).isPresent()).toBe(false);
    });

    /**
     * Генерирует случайное четырёхзначное число в заданном диапазоне
     * @returns {number} - число
     */
    var getRandomValue = function () {
        return Math.round(_.random(browser.params.randomValues.from, browser.params.randomValues.to));
    };

    afterAll(function () {
        publicationTree.toggleBranch(data.outerNodes, false);
    });
});