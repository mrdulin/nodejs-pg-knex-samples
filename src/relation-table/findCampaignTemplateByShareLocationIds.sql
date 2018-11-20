SELECT * FROM campaign_templates WHERE campaign_template_id IN (
  SELECT DISTINCT campaign_template_id FROM campaign_templates_locations WHERE location_id IN (1,2)
);
