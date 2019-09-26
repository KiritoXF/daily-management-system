const Goods = {
    weaponList: [{
        name: 'normal sword',
        description: 'just a normal sword for noob.',
        inventory: -1,
        cost: 100,
        attribute: {
            hp: 0,
            atk: 5
        }
    }, ],
    armorList: [{
        name: 'normal shield',
        description: 'you won\'t hope it will keep you from monsters.',
        inventory: -1,
        cost: 150,
        attribute: {
            hp: 50,
            atk: 0
        }
    }],
    jewelryList: [{
            name: 'magic ring',
            description: 'The most powerful item in this game, i guess.',
            inventory: 10,
            cost: 500,
            attribute: {
                hp: 100,
                atk: 20
            }
        },
        {
            name: 'diamond',
            description: 'Shining! People love this.',
            inventory: 5,
            cost: 1000
        }
    ],

    /**
     * Get weapon goods' list
     *
     * @returns Weapon goods list
     */
    getWeaponList() {
        return this.weaponList;
    },

    /**
     * Get armor goods' list
     *
     * @returns Armor goods list
     */
    getArmorList() {
        return this.armorList;
    },


    /**
     * Get jewelry goods' list
     *
     * @returns Jewelry goods list
     */
    getJewelryList() {
        return this.jewelryList;
    }
}

export default Goods;