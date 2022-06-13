create table tech_type
(
	id bigserial
		primary key,
	name text not null
);

comment on table tech_type is 'List of available types for technologies';

alter table tech_type owner to postgres;

