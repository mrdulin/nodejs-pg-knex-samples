# relation table

campaign_templates

| campaign_template_id | campaign_template_name |
| -------------------- | ---------------------- |
| 1                    | t-1                    |
| 2                    | t-2                    |

locations

| location_id | location_name |
| ----------- | ------------- |
| 1           | loc-1         |
| 2           | loc-2         |

campaign_templates_locations

| campaign_templates_location_id | campaign_template_id | location_id |
| ------------------------------ | -------------------- | ----------- |
| 1                              | 1                    | 1           |
| 2                              | 1                    | 2           |
| 3                              | 2                    | 2           |

findCampaignTemplateByShareLocationIds:

sub query:

```sql
SELECT * FROM campaign_templates WHERE campaign_template_id IN (
  SELECT campaign_template_id FROM campaign_templates_locations WHERE location_id IN (1,2)
);
```

inner join:

```sql
SELECT DISTINCT ct.*
FROM campaign_templates AS ct
INNER JOIN campaign_templates_locations AS ctl ON ct.campaign_template_id = ctl.campaign_template_id
INNER JOIN locations ON ctl.location_id = locations.location_id;
```
