drop table observer cascade;
drop table report cascade;
drop table illness cascade;
drop table vector cascade;
drop table symptom cascade;

create table if not exists observer(
  id serial primary key,
  expert_level text,
  created_at timestamp,
  updated_at timestamp default current_timestamp
);

create table if not exists report(
  id serial primary key,
  illness_id integer,
  observer_id integer,
  age integer,
  sex char(1),
  place_type text,
  case_type text,
  jitter boolean,
  observed_time timestamp,
  created_at timestamp,
  updated_at timestamp default current_timestamp
);

create table if not exists illness(
  id serial primary key,
  name text,
  reportable boolean,
  created_at timestamp,
  updated_at timestamp
);

create table if not exists vector(
  id serial primary key,
  illness_id integer,
  name text,
  created_at timestamp,
  updated_at timestamp default current_timestamp
);

create table if not exists symptom(
  id serial primary key, 
  case_id integer,
  illness_id integer,
  name text,
  created_at timestamp default current_timestamp
);


SELECT AddGeometryColumn('report', 'point', 4326, 'POINT', 2);
alter table report add constraint fk_report_illness foreign key (illness_id) references illness(id);
alter table report add constraint fk_report_observer foreign key (observer_id) references observer(id);
