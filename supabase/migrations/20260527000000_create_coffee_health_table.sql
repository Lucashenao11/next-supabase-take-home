create table "public"."coffee_health" (
    "id" serial primary key,
    "Age" integer,
    "Gender" text,
    "Country" text,
    "Coffee_Intake" numeric,
    "Caffeine_mg" numeric,
    "Sleep_Hours" numeric,
    "Sleep_Quality" text,
    "BMI" numeric,
    "Heart_Rate" integer,
    "Stress_Level" text,
    "Physical_Activity_Hours" numeric,
    "Health_Issues" text,
    "Occupation" text,
    "Smoking" integer,
    "Alcohol_Consumption" integer
);

alter table "public"."coffee_health" enable row level security;

create policy "Allow public read access"
on "public"."coffee_health"
as permissive
for select
to public
using(true);

create index idx_coffee_health_country on coffee_health ("Country");
create index idx_coffee_health_gender on coffee_health ("Gender");
create index idx_coffee_health_sleep_quality on coffee_health ("Sleep_Quality");
create index idx_coffee_health_stress_level on coffee_health ("Stress_Level");
create index idx_coffee_health_heart_rate on coffee_health ("Heart_Rate");
create index idx_coffee_health_coffee_intake on coffee_health ("Coffee_Intake");
create index idx_coffee_health_physical_activity_hours on coffee_health ("Physical_Activity_Hours");