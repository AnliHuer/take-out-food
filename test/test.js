describe('Take-Out-Food', function () {
  var inputs = [];
  var allItems = loadAllItems();


  beforeEach(function () {
    inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  })

  describe('Unit Test', function () {

    it('matchSelectItems()', function () {

      var expectItems = [
        {
          input: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
          count: 1
        },
        {
          input: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 2
        },
        {
          input: {id: 'ITEM0022', name: '凉皮', price: 8.00},
          count: 1
        }
      ];

      expect(matchSelectItems(inputs)).toEqual(expectItems);
    });


    it('buildSubtotalItems()', function () {
      var selectItems = [
        {
          input: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
          count: 1
        },
        {
          input: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
          count: 2
        },
        {
          input: {id: 'ITEM0022', name: '凉皮', price: 8.00},
          count: 1
        }
      ]

      var expectItems = [
        {
          selectItem: {
            input: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
            count: 1
          },
          subtotal: 18.00
        },
        {
          selectItem: {
            input: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
            count: 2
          },
          subtotal: 12.00
        },
        {
          selectItem: {
            input: {id: 'ITEM0022', name: '凉皮', price: 8.00},
            count: 1
          },
          subtotal: 8.00
        },
      ];

      expect(buildSubtotalItems(selectItems)).toEqual(expectItems);
    });


    it('buildTotalItem()', function () {
      var subtotalItems = [
        {
          selectItem: {
            input: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
            count: 1
          },
          subtotal: 18.00
        },
        {
          selectItem: {
            input: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
            count: 2
          },
          subtotal: 12.00
        },
        {
          selectItem: {
            input: {id: 'ITEM0022', name: '凉皮', price: 8.00},
            count: 1
          },
          subtotal: 8.00
        },
      ]

      var expectItem ={
        subtotalItems: subtotalItems,
        total: 38.00
      }

      expect(buildTotalItem(subtotalItems)).toEqual(expectItem);
    });


    it('buildPromotionItem()', function () {
      var totalItem = {
        subtotalItems:[
          {
            selectItem: {
              input: {id: 'ITEM0001', name: '黄焖鸡', price: 18.00},
              count: 1
            },
            subtotal: 18.00
          },
          {
            selectItem: {
              input: {id: 'ITEM0013', name: '肉夹馍', price: 6.00},
              count: 2
            },
            subtotal: 12.00
          },
          {
            selectItem: {
              input: {id: 'ITEM0022', name: '凉皮', price: 8.00},
              count: 1
            },
            subtotal: 8.00
          }
        ],
        total: 38.00
      };

      var expectItem ={
        totalItem: totalItem,
        bestPromotion: {
          promotion: {
            type: '指定菜品半价',
            items: ['ITEM0001', 'ITEM0022']
          },
          saving: 13.00
        }
      }

      expect(buildPromotionItem(totalItem)).toEqual(expectItem);
    });
  });


  describe("Integration Test", function () {
    it('should print final charge text', function () {
      spyOn(console, 'log');
  
      bestCharge(inputs);
  
      var expectText = '============= 订餐明细 =============\n' +
        '黄焖鸡 x 1 = 18元\n' +
        '肉夹馍 x 2 = 12元\n' +
        '凉皮 x 1 = 8元\n' +
        '-----------------------------------\n' +
        '使用优惠:\n' +
        '指定菜品半价(黄焖鸡，凉皮)，省13元\n' +
        '-----------------------------------\n' +
        '===================================';
  
      expect(console.log).toHaveBeenCalledWith(expectText);
    })
  })
})