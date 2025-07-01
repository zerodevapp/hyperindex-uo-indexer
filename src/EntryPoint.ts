/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  EntryPointV07,
  EntryPointV06,
  EntryPointV07_UserOperationEvent_event,
  HandlerContext,
  UserOperation,
} from "generated";


EntryPointV07.UserOperationEvent.handler(async ({ event, context }) => {
  await handleUserOperationEvent(event, context);
});

EntryPointV06.UserOperationEvent.handler(async ({ event, context }) => {
  await handleUserOperationEvent(event, context);
});

async function handleUserOperationEvent(event: EntryPointV07_UserOperationEvent_event, context: HandlerContext) {
  const userOpHash = event.params.userOpHash;
  const entity: UserOperation = {
    id: `${event.chainId}_${userOpHash}`,
    chainId: event.chainId,
    entryPoint: event.srcAddress,
    transactionHash: event.transaction.hash,
    userOpHash,
    sender: event.params.sender,
    paymaster: event.params.paymaster,
    nonce: event.params.nonce,
    success: event.params.success,
    actualGasCost: event.params.actualGasCost,
    actualGasUsed: event.params.actualGasUsed,
  };

  context.UserOperation.set(entity);

}


