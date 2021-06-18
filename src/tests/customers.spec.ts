import chai from 'chai'
import http from 'chai-http'

import server from '../server'

chai.use(http)

/**
 * This test battery validates all possible cases of all endpoints inside the customers routes.
 */
describe('[Customers Routes Tests]', () => {
  describe('[Book sessions endpoint] POST /sessions', () => {
    // try to book session without professional available request
    it('1. Should return error to book a session', (done) => {
      chai
        .request(server)
        .post('/sessions')
        .send({
          id: '1',
          day: '2022-01-01',
          hour: '20:00',

        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O profissional não está disponível nesse horário.',
            status: 400,
          })
        })

      done()
    })

    // missing id request
    it('2. Should return missing id exception', (done) => {
      chai
        .request(server)
        .post('/sessions')
        .send({
          day: '2022-01-01',
          hour: '20:00',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O id do profissional não foi informado.',
            status: 400,
          })
        })

      done()
    })

    // missing hour request
    it('3. Should return missing hour request', (done) => {
      chai
        .request(server)
        .post('/sessions')
        .send({
          id: '1',
          day: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O dia de agendamento não foi informado.',
            status: 400,
          })
        })

      done()
    })
  })
})