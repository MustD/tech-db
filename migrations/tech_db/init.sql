create table tech_type
(
    id   uuid default gen_random_uuid() not null
        constraint tdb_tech_type_pkey
            primary key,
    name text                           not null
);

comment
on table tech_type is 'List of available types for technologies';

create table tech_tag
(
    id   uuid default gen_random_uuid() not null
        constraint tdb_tech_tag_pkey
            primary key,
    name text                           not null
);

comment
on table tech_tag is 'Tech tags to apply to tech';

create table tech
(
    id           uuid default gen_random_uuid() not null
        constraint tdb_tech_pkey
            primary key,
    name         text                           not null,
    link         text                           not null,
    tech_type_id uuid                           not null
        constraint tdb_tech_tech_type_id_fkey
            references tech_type
            on update restrict on delete restrict
);

comment
on table tech is 'list of technologies';

create table tag_group
(
    id   uuid default gen_random_uuid() not null
        constraint tdb_tag_group_pkey
            primary key,
    name text                           not null
);

comment
on table tag_group is 'tag groups';

create table group2tag
(
    id           uuid default gen_random_uuid() not null
        primary key,
    tech_tag_id  uuid                           not null
        references tech_tag
            on update restrict on delete cascade,
    tag_group_id uuid                           not null
        references tag_group
            on update restrict on delete cascade,
    unique (tech_tag_id, tag_group_id)
);

comment
on table group2tag is 'many group to many tag';

create table tech2tag
(
    id      uuid default gen_random_uuid() not null
        primary key,
    tech_id uuid                           not null
        references tech
            on update restrict on delete cascade,
    tag_id  uuid                           not null
        references tech_tag
            on update restrict on delete cascade,
    unique (tech_id, tag_id)
);

comment
on table tech2tag is 'many tech to man tags';


