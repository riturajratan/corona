import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Typography,
  Box,
  makeStyles,
  useTheme
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
}));
export default function CoronaVirus() {
  return (
    <div>
      <h1>Corona Virus</h1>
      <div>
        <h2>Overview</h2>
        <p>
          Coronavirus disease (COVID-19) is an infectious disease caused by a
          newly discovered coronavirus.
        </p>

        <p>
          Most people infected with the COVID-19 virus will experience mild to
          moderate respiratory illness and recover without requiring special
          treatment. Older people, and those with underlying medical problems
          like cardiovascular disease, diabetes, chronic respiratory disease,
          and cancer are more likely to develop serious illness.
        </p>

        <p>
          The best way to prevent and slow down transmission is be well informed
          about the COVID-19 virus, the disease it causes and how it spreads.
          Protect yourself and others from infection by washing your hands or
          using an alcohol based rub frequently and not touching your face.
        </p>

        <p>
          The COVID-19 virus spreads primarily through droplets of saliva or
          discharge from the nose when an infected person coughs or sneezes, so
          it’s important that you also practice respiratory etiquette (for
          example, by coughing into a flexed elbow).
        </p>

        <p>
          At this time, there are no specific vaccines or treatments for
          COVID-19. However, there are many ongoing clinical trials evaluating
          potential treatments. WHO will continue to provide updated information
          as soon as clinical findings become available.
        </p>
      </div>
      <div>
        <h2>Prevention</h2>

        <p>
          To prevent infection and to slow transmission of COVID-19, do the
          following:
        </p>
        <ul>
          <li>
            Wash your hands regularly with soap and water, or clean them with
            alcohol-based hand rub.
          </li>
          <li>
            Maintain at least 1 metre distance between you and people coughing
            or sneezing.
          </li>
          <li>Cover your mouth and nose when coughing or sneezing.</li>
          <li>Avoid touching your face.</li>
          <li>Stay home if you feel unwell.</li>
          <li>
            Refrain from smoking and other activities that weaken the lungs.
          </li>
          <li>
            Practice physical distancing by avoiding unnecessary travel and
            staying away from large groups of people.
          </li>
        </ul>
      </div>
      <div>
        <h2>Symptoms</h2>
        <p>
          The COVID-19 virus affects different people in different ways.
          COVID-19 is a respiratory disease and most infected people will
          develop mild to moderate symptoms and recover without requiring
          special treatment. People who have underlying medical conditions and
          those over 60 years old have a higher risk of developing severe
          disease and death.
        </p>

        <h3>Common symptoms include:</h3>
        <ul>
          <li>fever</li>
          <li>tiredness</li>
          <li>dry cough.</li>
        </ul>

        <h3>Other symptoms include:</h3>
        <ul>
          <li>shortness of breath</li>
          <li>aches and pains</li>
          <li>sore throat</li>
          <li>
            and very few people will report diarrhoea, nausea or a runny nose.
          </li>
        </ul>
        <p>
          People with mild symptoms who are otherwise healthy should
          self-isolate and contact their medical provider or a COVID-19
          information line for advice on testing and referral.
        </p>

        <p>
          People with fever, cough or difficulty breathing should call their
          doctor and seek medical attention.
        </p>
      </div>
      <p><b><i>****content taken form <a href="https://www.who.int/health-topics/coronavirus#tab=tab_3">https://www.who.int/health-topics/coronavirus#tab=tab_3</a></i></b></p>
    </div>
  );
}
