import { ProductionDate } from '../types';

export const formatProductionDate = ({ day, month, year }: ProductionDate): string =>
    [day, month, year].filter(Boolean).join('.');
