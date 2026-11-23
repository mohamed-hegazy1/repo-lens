import {test} from 'node:test';import assert from 'node:assert/strict';import {validUsername,normalizeRepos,visibleRepos,safeRepoUrl,errorMessage,apiUrl} from './model.js';
test('username validation',()=>{assert.ok(validUsername('mohamed-hegazy1'));for(const u of ['a@b.com','-bad','bad-','bad--name','a'.repeat(40)])assert.equal(validUsername(u),false);});
test('API URL safely encodes username',()=>assert.ok(apiUrl('a/b').includes('a%2Fb')));
test('only safe repository destinations',()=>{assert.equal(safeRepoUrl('javascript:x'),'');assert.equal(safeRepoUrl('https://github.com.evil.test/a'),'');});
test('normalize partial response',()=>{const r=normalizeRepos([{id:1,name:'hello',html_url:'https://github.com/example/hello'}]);assert.equal(r[0].language,'Not specified');assert.equal(r[0].stars,0);});
test('reject non-array API response',()=>assert.throws(()=>normalizeRepos({})));
test('combined search and language',()=>assert.equal(visibleRepos([{name:'react',description:'demo',language:'JavaScript'}],'REACT','JavaScript').length,1));
test('rate limit error is explicit',()=>assert.match(errorMessage(403),/limiting/));
