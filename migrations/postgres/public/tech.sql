create table tech
(
	id bigserial
		primary key,
	name text not null,
	link text not null,
	tech_type_id bigint not null
		references tech_type
);

comment on table tech is 'list of technologies';

alter table tech owner to postgres;

