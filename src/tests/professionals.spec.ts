import chai from 'chai'
import http from 'chai-http'

import server from '../server'

chai.use(http)

/**
 * This test battery validates all possible cases of all endpoints inside the professional routes.
 */
describe('[Professional Routes Tests]', () => {
  /**
   * These tests validate all possible cases inside the create period availabilities endpoint
   */
  describe('[Create period availabilities endpoint] - POST /availabilities', () => {
    // Successful request
    it('1. Should have success creating period availabilities', (done) => {
      chai
        .request(server)
        .post('/availabilities')
        .send({
          id: '1',
          availabilities: {
            '2022-01-01': '08:00-11:00',
          }
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.eql({
            msg: 'Os horários foram registrados com sucesso.',
            status: 200,
          })
        })

        done()
    })
    
    // Missing id request
    it('2. Should return missing id exception', (done) => {
      chai
        .request(server)
        .post('/availabilities')
        .send({
          availabilities: {
            '2022-01-01': '08:00-11:00',
          }
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O id precisa ser informado.',
            status: 400
          })
        })

        done()
    })

    // Missing availabilities request
    it('3. Should return missing availabilities exception', (done) => {
      chai
        .request(server)
        .post('/availabilities')
        .send({
          id: '1',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'Ao menos um horário precisa ser informado.',
            status: 400
          })
        })

        done()
    })
  })

  /**
   * These tests validate all possible cases inside the capture period availabilities endpoint
   */
  describe('[Capture period availabilities endpoint] - GET /availabilities', () => {
    // Successful request
    it('1. Should have success capturing period availabilities', (done) => {
      chai
        .request(server)
        .get('/availabilities')
        .send({
          id: '1',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.eql({
            '2022-01-01': {
              '08:00': true,
              '08:30': true,
              '09:00': true,
              '09:30': true,
              '10:00': true,
            },
          })
        })

        done()
    })

    // Missing id request
    it('2. Should return missing id exception', (done) => {
      chai
        .request(server)
        .get('/availabilities')
        .send({})
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O id precisa ser informado.',
            status: 400,
          })
        })

        done()
    })
  })

  /**
   * These tests validate all possible cases inside the capture period availabilities by interval endpoint
   */
  describe('[Capture period availabilities by interval endpoint] - GET /availabilitiesByInterval', () => {
    // Successful request
    it('1. Should have success capturing period availabilities by interval', (done) => {
      chai
        .request(server)
        .get('/availabilitiesByInterval')
        .query({
          id: '1',
          startDate: '2022-01-01',
          endDate: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.eql({
            '2022-01-01': {
              '08:00': true,
              '08:30': true,
              '09:00': true,
              '09:30': true,
              '10:00': true,
            },
          })
        })

        done()
    })

    // Missing id request
    it('2. Should return missing id exception', (done) => {
      chai
        .request(server)
        .get('/availabilities')
        .query({
          startDate: '2022-01-01',
          endDate: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O id precisa ser informado.',
            status: 400,
          })
        })

        done()
    })

    // missing startDate request
    it('3. Should return missing startDate exception', (done) => {
      chai
        .request(server)
        .get('/availabilitiesByInterval')
        .query({
          id: '1',
          endDate: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'A data inicial precisa ser informada.',
            status: 400,
          })
        })

        done()
    })

    // missing endDate request
    it('4. Should return missing endDate exception', (done) => {
      chai
        .request(server)
        .get('/availabilitiesByInterval')
        .query({
          id: '1',
          startDate: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'A data final precisa ser informada.',
            status: 400,
          })
        })

        done()
    })
  })

  /**
   * These tests validate all possible cases inside the update period availabilities endpoint
   */
  describe('[Update period availabilities endpoint] - PUT /availabilities', () => {
    // Successful request
    it('1. Should have success updating period availabilities', (done) => {
      chai
        .request(server)
        .put('/availabilities')
        .send({
          id: '1',
          availabilities: {
            '2022-01-01': '08:00-11:00',
            '2022-01-02': '15:00-17:00',
          }
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.eql({
            msg: 'Os horários foram atualizados com sucesso.',
            status: 200,
          })
        })

        done()
    })

    // Missing id request
    it('2. Should return missing id exception', (done) => {
      chai
        .request(server)
        .put('/availabilities')
        .send({
          availabilities: {
            '2022-01-01': '08:00-11:00',
            '2022-01-02': '15:00-17:00',
          }
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O id precisa ser informado.',
            status: 400,
          })
        })

        done()
    })

    // Missing availabilities request
    it('3. Should return missing availabilities exception', (done) => {
      chai
        .request(server)
        .put('/availabilities')
        .send({
          id: '1',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'Ao menos um horário precisa ser informado.',
            status: 400,
          })
        })

        done()
    })
  })

  /**
   * These tests validate all possible cases inside the remove period availabilities endpoint
   */
  describe('[Remove period availabilities endpoint] - DELETE /availabilities', () => {
    // Successful request
    it('1. Should have success removing period availabilities', (done) => {
      chai
        .request(server)
        .delete('/availabilities')
        .send({
          id: '1',
          day: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(200)
          chai.expect(res.body).to.eql({
            msg: 'Os horários de disponibilidade foram excluídos para o dia informado.',
            status: 200,
          })
        })

        done()
    })

    // Missing id request
    it('2. Should return missing id exception', (done) => {
      chai
        .request(server)
        .delete('/availabilities')
        .send({
          day: '2022-01-01',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O id precisa ser informado.',
            status: 400,
          })
        })

        done()
    })

    // Missing day request
    it('3. Should return missing day exception', (done) => {
      chai
        .request(server)
        .delete('/availabilities')
        .send({
          id: '1',
        })
        .end((err, res) => {
          chai.expect(err).to.be.null
          chai.expect(res).to.have.status(400)
          chai.expect(res.body).to.eql({
            msg: 'O dia precisa ser informado.',
            status: 400,
          })
        })

        done()
    })
  })
})
