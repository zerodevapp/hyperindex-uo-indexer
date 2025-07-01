import assert from "assert";
import { 
  TestHelpers,
  UserOperation
} from "generated";
const { MockDb, EntryPointV07 } = TestHelpers;

describe("EntryPoint contract UserOperation event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for EntryPoint contract UserOperation event
  const event = EntryPointV07.UserOperationEvent.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("UserOperation is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await EntryPointV07.UserOperationEvent.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualUserOperation = mockDbUpdated.entities.UserOperation.get(
      `${event.chainId}_${event.params.userOpHash}`
    );

    // Creating the expected entity
    const expectedUserOperation: UserOperation = {
      id: `${event.chainId}_${event.params.userOpHash}`,
      userOpHash: event.params.userOpHash,
      sender: event.params.sender,
      paymaster: event.params.paymaster,
      nonce: event.params.nonce,
      success: event.params.success,
      actualGasCost: event.params.actualGasCost,
      actualGasUsed: event.params.actualGasUsed,
      entryPoint: event.srcAddress,
      transactionHash: event.transaction.hash,
      chainId: event.chainId,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualUserOperation, expectedUserOperation, "Actual UserOperation should be the same as the expectedUserOperation");
  });
});
