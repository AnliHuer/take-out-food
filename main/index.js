function splitInputs(inputs) {
  var newInputs = [];

  inputs.forEach(function (input) {
    var id = input.split(' x ')[0];
    var count = input.split(' x ')[1];
    newInputs.push(
      {
        id: id,
        count: parseInt(count)
      });
  })

  return newInputs;
}


function matchAllItems(allItems, input) {
  return allItems.filter(function (item) {
    return item.id === input.id;
  })[0];
}


function matchSelectItems(inputs) {
  var selectItems = [];
  var allItems = loadAllItems();

  var newInputs = splitInputs(inputs);

  newInputs.forEach(function (input) {
    selectItems.push(
      {
        input: matchAllItems(allItems, input),
        count: input.count
      }
    );
  });

  return selectItems;
}

function buildSubtotalItems(selectItems) {
  var subtotalItems = [];

  selectItems.forEach(function (item) {
    subtotalItems.push(
      {
        selectItem: item,
        subtotal: parseInt((item.count * item.input.price))
      }
    );
  })

  return subtotalItems;
}

function buildTotalItem(subtotalItems) {
  var total = 0;

  subtotalItems.forEach(function (item) {
    total += item.subtotal;
  })

  return {subtotalItems: subtotalItems, total: total};
}

function isExistItem(subtotalItem, items) {
  return items.filter(function (item) {
    return item === subtotalItem.selectItem.input.id
  });
};

function halfPricePromotion(items, totalItem) {
  var saving = 0;

  totalItem.subtotalItems.forEach(function (subtotalItem) {
    if (isExistItem(subtotalItem, items).length) {
      saving += subtotalItem.subtotal * 0.5;
    }
  })

  return saving;
}

function calculatePromotion(promotion, totalItem) {


  if (promotion.type === '下单直接减2元') {
    return {promotion: promotion, saving: 2.00}
  } else if (promotion.type === '满30减6元' & totalItem.total >= 30) {
    return {promotion: promotion, saving: 6.00}
  } else if (promotion.type === '直接9折优惠') {
    return {promotion: promotion, saving: totalItem.total * 0.9}
  } else if (promotion.type === '指定菜品半价') {
    return {promotion: promotion, saving: halfPricePromotion(promotion.items, totalItem)}
  }
}

function getBestPromotion(totalItem) {
  var allPromotions = loadPromotions();
  var sortPromotions = [];
  var bestPromotion = {};

  allPromotions.forEach(function (promotion) {
    sortPromotions.push(calculatePromotion(promotion, totalItem));
  })

  sortPromotions.forEach(function (sortPromotion) {
    bestPromotion = bestPromotion || bestPromotion.saving < sortPromotion.saving ? sortPromotion : bestPromotion;
  })

  return bestPromotion;
};

function buildPromotionItem(totalItem) {
  var bestPromotion = getBestPromotion(totalItem);

  return {
    totalItem: totalItem,
    bestPromotion: bestPromotion
  }
}

function isExistAllItems(item) {
  allItems = loadAllItems();

  return allItems.filter(function (allItem) {
    return allItem.id === item;
  })[0].name;
}

function generatePromotionText(promotionItem) {
  var promotion = promotionItem.bestPromotion.promotion;
  var promotionList = '使用优惠:\n' + promotion.type;
  var items = promotion.items;

  if (items) {
    promotionList += '(';

    for (var i = 0; i < items.length - 1; i++) {
      promotionList += isExistAllItems(items[i]) + '，';
    }
    promotionList += isExistAllItems(items[items.length - 1]) + ')';
  }

  return promotionList += '，省' + promotionItem.bestPromotion.saving + '元\n';
}

function generateChargeText(promotionItem) {
  var chargeList = '';

  promotionItem.totalItem.subtotalItems.forEach(function (item) {
    chargeList += item.selectItem.input.name + ' x ' + item.selectItem.count + ' = ' + item.subtotal + '元\n';
  });

  return chargeList;
}

function printText(promotionItem) {
  var top = '============= 订餐明细 =============\n';
  var splitLine = '-----------------------------------\n';
  var bottom = '===================================';

  return top + generateChargeText(promotionItem) + splitLine + generatePromotionText(promotionItem) + splitLine + bottom;
}

function bestCharge(inputs) {
  var selectItems = matchSelectItems(inputs);
  var subtotalItems = buildSubtotalItems(selectItems);
  var totalItem = buildTotalItem(subtotalItems);
  var promotionItem = buildPromotionItem(totalItem);

  console.log(printText(promotionItem));
}