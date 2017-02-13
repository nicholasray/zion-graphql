const { expect } = require('chai');

exports.shouldBehaveLikeCrudDao = function() {
  describe("#totalCount", function() {
    context("with no opts", function() {
      beforeEach(function() {
        return this.factory.create().then(rows => {
          this.id = rows[0].id;
        })
      })

      it("returns the total count", function() {
        // when
        const promise = this.subject.totalCount({});

        // expect
        return promise.then(result => {
          expect(result).to.equal(1);
        })
      })
    })
  })

  describe("#findById", function() {
    context("with present record", function() {
      beforeEach(function() {
        return this.factory.create().then(rows => {
          this.id = rows[0].id;
        })
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

    context("with absent record", function() {
      it("returns null", function() {
        // when
        const promise = this.subject.findById(0)

        // expect
        return promise.then(result => {
          expect(result).to.be.null;
        })
      })
    })
  })

  describe("#all", function() {
    context("with present records", function() {
      beforeEach(function() {
        this.ids = [];

        return this.factory.create().then(rows => {
          this.ids.push(rows[0].id);
          return this.factory.create().then(rows => {
            this.ids.push(rows[0].id)
          })
        });
      })

      it("returns an array of records", function() {
        // when
        const promise = this.subject.all({})

        // expect
        return promise.then(results => {
          expect(results).to.have.lengthOf(2);
          expect([results[0].id(), results[1].id()]).to.include.members([this.ids[0], this.ids[1]]);
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
      beforeEach(function() {
        return this.factory.build().then(builtAttrs => {
          this.attrs = builtAttrs;
        })
      })

      it("creates record", function() {
        // when
        const promise = this.subject.create(this.attrs);

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
        return this.factory.create().then(rows => {
          this.id = rows[0].id;
          this.updatedAt = rows[0].updated_at;
        })
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

    context("with absent record", function() {
      it("raises an error", function() {
        // when
        const promise = this.subject.update(0, {id: 1});

        // expect
        return promise.catch(result => {
          expect(result).to.be.instanceOf(Error);
        })

      })
    })
  })
};
