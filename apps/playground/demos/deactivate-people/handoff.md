## Goal
Let an Admin remove access for people who have left, and invite new starters, without losing anyone's learning history.

## User
An Admin at a 500-person hotel group (Meridian Hotels), managing People across seven departments and eight sites. They know the People page and do this weekly.

## Entry point
Admin › People & Teams › People.

## Flows
### 1. Deactivate one person
1. People: the Active tab lists everyone who can access 5Mins, 25 per page. The Admin finds the person and opens the row's actions menu.
2. Actions menu: View Profile and Deactivate. Choosing Deactivate opens a confirmation.
3. Confirm: "Deactivate <name>?" explains they lose access straight away but keep their learning history. Deactivate confirms; Cancel goes back.
4. Done: a toast says "<name> deactivated", the Active count drops by one and the Deactivated count rises by one.
5. Deactivated tab: the person is listed with the date, and the row's actions menu offers Reactivate.

Success: the person is on the Deactivated tab and can no longer sign in.

### 2. Invite people
1. People: Invite People in the page header opens the invite modal.
2. Invite modal: the Admin pastes one or more email addresses. Send Invites stays disabled until there's at least one.
3. Done: a toast says how many invites were sent, and the modal closes.

Success: the toast confirms the invites; invited people appear on the Active tab as Invited once they're added.

## States
- Empty: with no people, People shows "No people yet" with Invite People (see `?data=empty`).
- Search with no results shows "No people match" with Clear Filters.
- Long names and emails truncate in the table; 500 people paginate 25 per page.

## Open questions
- Should bulk deactivation (select rows, then Deactivate N People) be part of this flow, or its own?
- Do deactivated people need a reason (left, long leave) as in the prototype?
