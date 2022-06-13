create function dearmor(text) returns bytea
	immutable
	strict
	parallel safe
	language c
as $$
begin
-- missing source code
end;
$$;

alter function dearmor(text) owner to postgres;

