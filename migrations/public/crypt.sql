create function crypt(text, text) returns text
	immutable
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function crypt(text, text) owner to postgres;

