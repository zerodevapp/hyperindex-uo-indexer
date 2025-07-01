import assert from "assert";
import { 
  TestHelpers,
  EntryPoint_AccountDeployed
} from "generated";
const { MockDb, EntryPoint } = TestHelpers;

describe("EntryPoint contract AccountDeployed event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for EntryPoint contract AccountDeployed event
  const event = EntryPoint.AccountDeployed.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("EntryPoint_AccountDeployed is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await EntryPoint.AccountDeployed.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualEntryPointAccountDeployed = mockDbUpdated.entities.EntryPoint_AccountDeployed.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedEntryPointAccountDeployed: EntryPoint_AccountDeployed = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      userOpHash: event.params.userOpHash,
      sender: event.params.sender,
      factory: event.params.factory,
      paymaster: event.params.paymaster,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualEntryPointAccountDeployed, expectedEntryPointAccountDeployed, "Actual EntryPointAccountDeployed should be the same as the expectedEntryPointAccountDeployed");
  });
});
