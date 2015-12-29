import {async} from '../index.js'
import {expect, assert} from 'chai'

describe('waterfall', function() {
  context('basic', function(){
    it('basic test', function(done){
      var call_order = []
      async.waterfall([
        function (callback) {
          call_order.push('fn1')
          setTimeout(function () { callback(null, 'one', 'two'); }, 0)
        },
        function (arg1, arg2, callback) {
          call_order.push('fn2')
          expect(arg1).to.eql('one')
          expect(arg2).to.eql('two')
          setTimeout(function () { callback(null, arg1, arg2, 'three'); }, 25)
        },
        function (arg1, arg2, arg3, callback) {
          call_order.push('fn3')
          expect(arg1).to.eql('one')
          expect(arg2).to.eql('two')
          expect(arg3).to.eql('three')
          callback(null, 'four')
        },
        function (arg4, callback) {
          call_order.push('fn4')
          expect(call_order).to.eql(['fn1', 'fn2', 'fn3', 'fn4'])
          callback(null, 'test')
        }
      ], function (err) {
        assert.ok(err === null, err + " passed instead of 'null'")
        done()
      })
    })
  })
})