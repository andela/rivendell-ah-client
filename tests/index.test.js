import chai from 'chai';

describe('First Ever Test', () => {
  it('runs the test', () => {
    expect(true).toBe(true);
  });
});


describe('First Chai  Test', () => {
  it('runs the test', () => {
    chai.expect(true).to.be.true;
  });
});
