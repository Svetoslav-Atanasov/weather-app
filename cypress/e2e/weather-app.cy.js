/* eslint-disable no-undef */
const getTomorrowFormatted = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year = tomorrow.getFullYear();
  let month = tomorrow.getMonth() + 1;
  let day = tomorrow.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

const tomorrowFormatted = getTomorrowFormatted();

describe('Weather App test', () => {
  const viewports = ['macbook-13', 'iphone-6'];
  beforeEach(() => {
    cy.visit('')
  })
  viewports.forEach((viewport) => {
    it(`Home Page: Change metric units - Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.getDataTest('metric-unit-button').click()
      cy.wait(1000)
      cy.getDataTest(`weather-card-${tomorrowFormatted}`).should('contain.text', '°F')
      cy.getDataTest('metric-unit-button').click()
      cy.wait(1000)
      cy.getDataTest(`weather-card-${tomorrowFormatted}`).should('contain.text', '°C')
    })
    it(`Home Page: Check alerts - Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.wait(2000)
      cy.window().then((window) => {
        const hasAlerts = window.alertData.length > 0;

        if (hasAlerts) {
          cy.getDataTest('weather-alert-dialog-button-open').should('exist');
          cy.getDataTest('weather-alert-dialog-button-open').click()
          cy.getDataTest('weather-alert-dialog').should('exist')
          cy.getDataTest('weather-alert-dialog-title').invoke('text').should('not.be.empty')
          cy.getDataTest('weather-alert-dialog-content').invoke('text').should('not.be.empty')
          cy.getDataTest('weather-alert-dialog-button-close').should('exist')
          cy.getDataTest('weather-alert-dialog-button-close').click()
          cy.getDataTest('weather-alert-dialog').should('not.exist')
          cy.getDataTest('weather-alert-dialog-button-open').should('exist');
        } else {
          cy.getDataTest('weather-alert-dialog-button-open').should('not.exist');
        }
      });
    });
    it(`Details Page: Accordion works correctly  - Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.getDataTest(`weather-card-${tomorrowFormatted}`).click()
      cy.contains(/humidity/i).should('not.be.visible')
      cy.contains(/wind speed/i).should('not.be.visible')
      cy.getDataTest(`weather-accordion-${tomorrowFormatted} 00:00:00`).click()
      cy.wait(1000)
      cy.contains(/humidity/i).should('be.visible')
      cy.contains(/wind speed/i).should('be.visible')
      cy.get(`[data-test="weather-accordion-${tomorrowFormatted} 00:00:00"] div[role="button"]`).click()
      cy.wait(1000)
      cy.contains(/humidity/i).should('not.be.visible')
      cy.contains(/wind speed/i).should('not.be.visible')
    })
    it(`Home, Details Page: Going to details and back - Viewport: ${viewport}`, () => {
      cy.viewport(viewport);
      cy.getDataTest(`weather-card-${tomorrowFormatted}`).click()
      cy.getDataTest('weather-app-details-header').should('contain.text', 'Weather App')
      cy.getDataTest('weather-app-details-header').click()
    })
  })
})