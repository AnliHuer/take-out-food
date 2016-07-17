function loadAllItems() {
  return [
    {
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    },
    {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    },
    {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }
  ]
};

function loadPromotions() {
  return [
    {
      type: '下单直接减2元'
    },
    {
      type: '满30减6元'
    },
    {
      type: '直接9折优惠'
    },
    {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }
  ];
}