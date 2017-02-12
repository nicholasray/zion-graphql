const { expect } = require('chai');
const SchemaBuilder = require('./schemaBuilder');

describe('SchemaBuilder', () => {
  var subject;

  beforeEach(() => {
    subject = new SchemaBuilder();
  })

  describe('#build', () => {
    context("when adding one type and one endpoint", () => {
      it("returns correctly formatted schema", () => {
        // given
        const type = `
          type Dog {
            id: ID!
            createdAt: String!
          }

          input DogInput {
            createdAt: String
          }
        `;

        const endpoint = `
          allDogs(limit: Int): [Dog]
        `;

        const mutation = `
          createDog(input: DogInput): Dog
        `

        // when
        subject.addTypes(type);
        subject.addQueryEndpoints(endpoint);
        subject.addMutationEndpoints(mutation);
        const result = subject.build();

        // expect
        console.log(result);
        expect(result).to.match(/type Dog {/);
        expect(result).to.match(/id: ID!/);
        expect(result).to.match(/createdAt: String!/);
        expect(result).to.match(/type Query {/);
        expect(result).to.match(/allDogs\(limit: Int\): \[Dog\]/);
        expect(result).to.match(/createDog\(input: DogInput\): Dog/);
      })
    })

    context("when multiple types and endpoints", () => {
      it("returns correctly formatted schema", () => {
        // given
        const dogType = `
          type Dog {
            id: ID!
            createdAt: String!
          }
        `;

        const catType = `
          type Cat {
            id: ID!
            createdAt: String!
          }
        `
        const dogEndpoint = `
          allDogs(limit: Int): [Dog]
        `;

        const catEndpoint = `
          allCats(limit: Int): [Cat]
        `;

        // when
        subject.addTypes(dogType);
        subject.addQueryEndpoints(dogEndpoint)

        subject.addTypes(catType);
        subject.addQueryEndpoints(catEndpoint)
        const result = subject.build();

        // expect
        expect(result).to.match(/type Dog {/);
        expect(result).to.match(/type Cat {/);
        expect(result).to.match(/type Query {/);
      })
    })
  })
})
