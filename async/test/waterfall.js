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
    
    it('empty array', function(done) {
      async.waterfall([], function(err){
        if (err) throw err
        done()
      })
    })
    
    it('non-array', function(done) {
      async.waterfall({}, function(err){
        expect(err.message).to.eql('First argument to waterfall must be an array of functions')
        done()
      })
    })
    
    it('no callback', function(done) {
      async.waterfall([
        function(callback){ callback() },
        function(callback){
          callback()
          done()
        }
      ])
    })
    
    it('async', function(done) {
      var call_order = []
      async.waterfall([
        function(callback){
          call_order.push(1)
          callback();
          call_order.push(2)
        },
        function(callback){
          call_order.push(3)
          callback()
        },
        function(){
          expect(call_order).to.eql([1,2,3])
          done()
        }
      ])
    })
    
    it('error', function(done) {
      async.waterfall([
        function(callback){
          callback('error')
        },
        function(callback){
          assert.ok(false, 'next function should not be called')
          callback()
        }
      ], function(err){
        expect(err).to.eql('error')
      })
      setTimeout(done, 50)
    })
    
    it('multiple callback calls', function(done) {
      var call_order = [];
      var times = 0;
      var arr = [
        function(callback){
          call_order.push(1)
          // call the callback twice. this should call function 2 twice
          callback(null, 'one', 'two')
          callback(null, 'one', 'two')
        },
        function(arg1, arg2, callback){
          call_order.push(2)
          callback(null, arg1, arg2, 'three')
        },
        function(arg1, arg2, arg3, callback){
          call_order.push(3)
          callback(null, 'four')
        },
        function(/*arg4*/){
          call_order.push(4)
          if (++times >= 2) {
            expect(call_order).to.eql([1,2,2,3,3,4,4])
            done()
          }
        }
      ]
      async.waterfall(arr)
    })
    
  })
})