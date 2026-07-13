#!/usr/bin/env python3
from __future__ import annotations

import json
import sys

FOUNDATION = ['personal-spec-kit-foundation', 'personal-harness-agent-teams', 'personal-agent-governance-toolkit']

RULES = [
    (['spec','plan','design','implement','feature','workflow'], ['personal-spec-kit-foundation'], ['todo','file']),
    (['split','team','delegate','parallel','multi-agent','orchestrate'], ['personal-harness-agent-teams'], ['delegation','todo']),
    (['delete','remove','truncate','drop','destroy','publish','send','email','commit','push','merge','deploy'], ['personal-agent-governance-toolkit'], ['terminal','file']),
    (['scrape','source','summarize','collect','research','lead','opportunity'], ['source-collection-agent'], ['web','browser','file']),
    (['job','internship','apply','resume','cv','cover letter'], ['job-search-apply-agent'], ['web','file','terminal']),
    (['verify','validation','end-to-end','e2e','test','works perfectly'], ['agent-stack-verification-loop'], ['terminal','file','todo']),
    (['scroll','animation','motion','prompt'], ['scroll-animation-prompt-agent'], ['image_gen','file']),
    (['audio','voice','narration','tts','speech'], ['fish-audio-agent'], ['tts','file']),
]


def route(text: str):
    t = text.lower()
    skills = []
    toolsets = []
    for keywords, matched_skills, matched_toolsets in RULES:
        if any(k in t for k in keywords):
            skills.extend(matched_skills)
            toolsets.extend(matched_toolsets)
    if not skills:
        skills = FOUNDATION[:]
        toolsets = ['file', 'terminal']
    else:
        if any(k in t for k in ['risk', 'sensitive', 'delete', 'send', 'push', 'commit', 'publish']):
            for s in FOUNDATION:
                if s not in skills:
                    skills.insert(0, s)
        elif any(k in t for k in ['build', 'create', 'make', 'setup', 'set up', 'implement']):
            if 'personal-spec-kit-foundation' not in skills:
                skills.insert(0, 'personal-spec-kit-foundation')
        if 'delegation' in toolsets and 'personal-harness-agent-teams' not in skills:
            skills.insert(0, 'personal-harness-agent-teams')
    dedup_skills = []
    for s in skills:
        if s not in dedup_skills:
            dedup_skills.append(s)
    dedup_toolsets = []
    for ts in toolsets:
        if ts not in dedup_toolsets:
            dedup_toolsets.append(ts)
    return {
        'skills': dedup_skills,
        'toolsets': dedup_toolsets,
        'load_first': FOUNDATION if any(s in dedup_skills for s in FOUNDATION) else dedup_skills[:1],
        'confidence': 'high' if len(dedup_skills) > 1 else 'medium',
    }


def main():
    text = ' '.join(sys.argv[1:]) if len(sys.argv) > 1 else sys.stdin.read()
    if not text.strip():
        print(json.dumps({'skills': FOUNDATION, 'toolsets': ['file', 'terminal'], 'load_first': FOUNDATION, 'confidence': 'low'}, indent=2))
        return
    print(json.dumps(route(text), indent=2))

if __name__ == '__main__':
    main()
