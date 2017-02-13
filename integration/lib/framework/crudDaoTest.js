const { expect } = require('chai');

exports.shouldBehaveLikeCrudDao = function() {
  describe("#findById", function() {
    context("with present record", function() {
      beforeEach(function() {
        return this.db.insert({}, "id").into(this.tableName).then(id => {
          this.id = id[0];
        });
      })

      it("returns the record", function() {
        // when
        const promise = this.subject.findById(this.id)

        // expect
        return promise.then(result => {
          expect(result.id()).to.equal(this.id);
        })
      })
    })
  })

  describe("#all", function() {
    context("with present records", function() {
      beforeEach(function() {
        this.ids = [];

        return this.db.insert({}, "id").into(this.tableName).then(id => {
          this.ids.push(id[0]);
          return this.db.insert({}, "id").into(this.tableName).then(id => {
            this.ids.push(id[0]);
          })
        });
      })

      it("returns an array of records", function() {
        // when
        const promise = this.subject.all({})

        // expect
        return promise.then(results => {
          expect(results).to.have.lengthOf(2);
          expect(results[0].id()).to.equal(this.ids[1]);
          expect(results[1].id()).to.equal(this.ids[0]);
        })
      })
    })

    context("with no records", function() {
      it("returns an empty array", function() {
        // when
        const promise = this.subject.all({});

        // expect
        return promise.then(results => {
          expect(results).to.have.lengthOf(0);
        })
      })
    })
  })

  describe("#create", function() {
    context("with input", function() {
      it("creates record", function() {
        // when
        const promise = this.subject.create({});

        // expect
        return promise.then(result => {
          expect(result.node().id()).to.exist;
        })
      })
    })
  })

  describe("#update", function() {
    context("with present record", function() {
      beforeEach(function() {
        return this.db.insert({}, "*").into(this.tableName).then(result => {
          this.id = result[0].id;
          this.updatedAt =  result[0].updated_at;
        });
      })

      it("updates record", function() {
        // when
        const promise = this.subject.update(this.id, {id: this.id + 1});

        //expect
        return promise.then(result => {
          expect(result.updatedAt()).to.not.eql(this.updatedAt);
        })
      })
    })
  })
};
