import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { Application } from '../app/application';

export const chaiWithHttp = chai.use(chaiHttp);
export const { expect } = chai;
export const app = Application.instance.app;
export const baseUrl = '/v1';
