/*
 * Copyright (c) 2017, Two Sigma Open Source
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of git-meta nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

const assert  = require("chai").assert;
const NodeGit = require("nodegit");

const RepoStatus = require("./repo_status");

/**
 * Return the `RepoStatus.FILESTATUS` value that corresponds to the specified
 * flag.  The behavior is undefined unless `flag` represents one of the types
 * convertible to `FILESTATUS`.
 *
 * @param {NodeGit.Diff.DELTA} flag
 * @return {RepoStatus.FILESTATUS}
 */
exports.convertDeltaFlag = function (flag) {
    const DELTA = NodeGit.Diff.DELTA;
    const FILESTATUS = RepoStatus.FILESTATUS;
    switch (flag) {
        case DELTA.MODIFIED: return FILESTATUS.MODIFIED;
        case DELTA.ADDED: return FILESTATUS.ADDED;
        case DELTA.DELETED: return FILESTATUS.REMOVED;
        case DELTA.CONFLICTED: return FILESTATUS.CONFLICTED;
        case DELTA.RENAMED: return FILESTATUS.RENAMED;
        case DELTA.TYPECHANGE: return FILESTATUS.TYPECHANGED;
    }
    assert(`Unrecognized DELTA type: ${flag}.`);
};
