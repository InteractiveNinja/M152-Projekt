<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Accordion, { Panel, Header, Content as AContent } from '@smui-extra/accordion';

	export const open = (reason: string) => {
		isOpen = true;
		reasonText = reason;
	};
	let isOpen = false;
	let reasonText: string;
</script>

<Dialog bind:open={isOpen}>
	<Title id="simple-title">Oh nein!</Title>
	<Content id="simple-content"
		>Es ist ein Fehler aufgetreten, die Aktion konnte nicht durchgeführt werden
		<Accordion>
			<Panel>
				<Header>Fehlermeldung</Header>
				<AContent>
					<p class="error-text">{reasonText}</p>
				</AContent>
			</Panel>
		</Accordion>
	</Content>
	<Actions>
		<Button variant="raised" on:click={() => (isOpen = false)}>
			<Label>Okay!</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	@use '@material/card/mixins' as card;
	@use '@material/theme/color-palette' as theme;

	.error-text {
		padding: 0.5em;
		color: black;
		font-family: 'Courier New', monospace;
	}
</style>
