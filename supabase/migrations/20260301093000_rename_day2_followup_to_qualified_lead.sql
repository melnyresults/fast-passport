-- Rename legacy pipeline stage values in persisted CRM data
UPDATE leads
SET stage = 'Qualified Lead'
WHERE stage = 'Day 2 Follow Up';
