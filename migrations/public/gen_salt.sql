create function gen_salt(text) returns text
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function gen_salt(text) owner to postgres;

create function gen_salt(text, integer) returns text
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function gen_salt(text, integer) owner to postgres;

