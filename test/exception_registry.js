var ExceptionRegistry = artifacts.require('ExceptionRegistry')

contract('ExceptionRegistry', function (accounts) {
  it('should make a sale', function () {
    var instance = null
    return ExceptionRegistry.deployed().then(function (contract) {
      instance = contract
      return instance.makeSale('sampleproject', 'testuser', accounts[2], 1000, {from: accounts[1]})
    }).then(function () {
      return instance.getSaleCountForBuyer.call(accounts[1])
    }).then(function (saleCount) {
      // console.log('saleCount: ' + saleCount)
      assert.equal(saleCount.toNumber(), 1)
      return instance.getSaleForBuyerAtIndex.call(accounts[1], 0)
    }).then(function (sale) {
      // console.log(sale)
      assert.equal(sale[0], 'sampleproject')
      assert.equal(sale[1], 'testuser')
      assert.equal(sale[2], accounts[2])
      assert.equal(sale[3], accounts[1])
      assert.equal(sale[4], 1000)
    })
  })
})
