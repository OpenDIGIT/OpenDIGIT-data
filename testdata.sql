insert into observer values(
  default, 'EXPERT', current_timestamp, current_timestamp);

insert into illness values(
  default, 'TEST DISEASE', true, current_timestamp, current_timestamp
);

insert into report values(
  default, 1, 1, 55, 'M', 'CLINIC', 'CONFIRMED', true, current_timestamp, current_timestamp, current_timestamp
);
