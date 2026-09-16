import test from "node:test";
import assert from "node:assert/strict";
import { createLocalLikesStore } from "../server/utils/localLikes.ts";

test("local likes enable an empty post and make repeated mutations idempotent", () => {
  const store = createLocalLikesStore();
  const empty = { count: 0, liked: false, enabled: true };
  assert.deepEqual(store.getStatus("/blog/one", "alice"), empty);
  assert.deepEqual(store.removeLike("/blog/one", "alice"), empty);
  for (let i = 0; i < 3; i++) {
    assert.deepEqual(store.addLike("/blog/one", "alice"), {
      count: 1,
      liked: true,
      enabled: true,
    });
  }
  assert.deepEqual(store.removeLike("/blog/one", "alice"), empty);
  assert.deepEqual(store.removeLike("/blog/one", "alice"), empty);
});

test("local likes count distinct visitors and isolate posts", () => {
  const store = createLocalLikesStore();
  store.addLike("/blog/one", "alice");
  store.addLike("/blog/one", "bob");
  assert.deepEqual(store.getStatus("/blog/one", "carol"), {
    count: 2,
    liked: false,
    enabled: true,
  });
  assert.deepEqual(store.getStatus("/blog/two", "alice"), {
    count: 0,
    liked: false,
    enabled: true,
  });
  store.removeLike("/blog/one", "alice");
  assert.deepEqual(store.getStatus("/blog/one", "bob"), {
    count: 1,
    liked: true,
    enabled: true,
  });
  assert.equal(createLocalLikesStore().getStatus("/blog/one", "bob").count, 0);
});
