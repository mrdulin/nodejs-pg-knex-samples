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

```sql
SELECT * FROM campaign_templates WHERE campaign_template_id IN (
  SELECT campaign_template_id FROM campaign_templates_locations WHERE location_id IN (1,2)
);
```
