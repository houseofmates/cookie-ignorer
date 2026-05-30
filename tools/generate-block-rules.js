// This is used to generate the block rules for Manifest V3 from the block rules in Manifest V2.

import { blockUrls } from "../src/data/rules.js";
import { posthog, distinctId } from "./posthog.js";

function generateDeclarativeNetRules() {
  const result = [];
  let lastId = 1;

  const addRule = (blockRule) => {
    const newRule = {
      id: lastId++,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: blockRule.r,
        resourceTypes: ["script", "stylesheet", "xmlhttprequest", "image"],
      },
    };

    if (blockRule.e) {
      newRule.condition.excludedInitiatorDomains = blockRule.e.slice();
    }

    result.push(newRule);
  };

  for (const blockRule of blockUrls.common) {
    addRule(blockRule);
  }

  for (const blockRules of Object.values(blockUrls.common_groups)) {
    for (const blockRule of blockRules) {
      addRule(blockRule);
    }
  }

  for (const [domain, url] of Object.entries(blockUrls.specific)) {
    const newRule = {
      id: lastId++,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: url[0],
        resourceTypes: ["script", "stylesheet", "xmlhttprequest", "image"],
        initiatorDomains: [domain],
      },
    };
    result.push(newRule);
  }

  console.log(JSON.stringify(result, null, "\t"));
  return result.length;
}

async function main() {
  try {
    const ruleCount = generateDeclarativeNetRules();
    posthog.capture({
      distinctId,
      event: "block_rules_generated",
      properties: { rule_count: ruleCount },
    });
  } catch (error) {
    posthog.captureException(error, distinctId);
  }
  await posthog.shutdown();
}

main();
