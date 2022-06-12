create table tech_tag
(
	id bigserial
		primary key,
	name text not null
);

comment on table tech_tag is 'Tech tags to apply to tech';

alter table tech_tag owner to postgres;

