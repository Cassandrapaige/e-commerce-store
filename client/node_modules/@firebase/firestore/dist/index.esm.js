import { __extends as t, __awaiter as e, __generator as n, __spreadArrays as r } from "tslib";

import i from "@firebase/app";

import { Logger as o, LogLevel as s } from "@firebase/logger";

import { getUA as u, isMobileCordova as a, isReactNative as h, isElectron as c, isIE as f, isUWP as l, isBrowserExtension as p } from "@firebase/util";

import { Component as d } from "@firebase/component";

import { XhrIo as y, EventType as v, ErrorCode as m, createWebChannelTransport as g, WebChannel as w } from "@firebase/webchannel-wrapper";

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** The semver (www.semver.org) version of the SDK. */ var E = i.SDK_VERSION, b = /** @class */ function() {
    function t(t) {
        this.uid = t;
    }
    return t.prototype.t = function() {
        return null != this.uid;
    }, 
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */
    t.prototype.s = function() {
        return this.t() ? "uid:" + this.uid : "anonymous-user";
    }, t.prototype.isEqual = function(t) {
        return t.uid === this.uid;
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
/** A user with a null UID. */ b.UNAUTHENTICATED = new b(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
b.i = new b("google-credentials-uid"), b.h = new b("first-party-uid");

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var T = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
}, I = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, n) || this).code = t, r.message = n, r.name = "FirebaseError", 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        r.toString = function() {
            return r.name + ": [code=" + r.code + "]: " + r.message;
        }, r;
    }
    return t(n, e), n;
}(Error), N = function(t, e) {
    this.user = e, this.type = "OAuth", this.o = {}, 
    // Set the headers using Object Literal notation to avoid minification
    this.o.Authorization = "Bearer " + t;
}, A = /** @class */ function() {
    function t() {
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.u = null;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(null);
    }, t.prototype._ = function() {}, t.prototype.l = function(t) {
        this.u = t, 
        // Fire with initial user.
        t(b.UNAUTHENTICATED);
    }, t.prototype.T = function() {
        this.u = null;
    }, t;
}(), _ = /** @class */ function() {
    function t(t) {
        var e = this;
        /**
         * The auth token listener registered with FirebaseApp, retained here so we
         * can unregister it.
         */        this.I = null, 
        /** Tracks the current User. */
        this.currentUser = b.UNAUTHENTICATED, this.R = !1, 
        /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
        this.A = 0, 
        /** The listener registered with setChangeListener(). */
        this.u = null, this.forceRefresh = !1, this.I = function() {
            e.A++, e.currentUser = e.m(), e.R = !0, e.u && e.u(e.currentUser);
        }, this.A = 0, this.auth = t.getImmediate({
            optional: !0
        }), this.auth ? this.auth.addAuthTokenListener(this.I) : (
        // if auth is not available, invoke tokenListener once with null token
        this.I(null), t.get().then((function(t) {
            e.auth = t, e.I && 
            // tokenListener can be removed by removeChangeListener()
            e.auth.addAuthTokenListener(e.I);
        }), (function() {})));
    }
    return t.prototype.getToken = function() {
        var t = this, e = this.A, n = this.forceRefresh;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((function(n) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            if (t.A !== e) throw new I(T.ABORTED, "getToken aborted due to token change.");
            return n ? (Ve("string" == typeof n.accessToken), new N(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype._ = function() {
        this.forceRefresh = !0;
    }, t.prototype.l = function(t) {
        this.u = t, 
        // Fire the initial event
        this.R && t(this.currentUser);
    }, t.prototype.T = function() {
        this.auth && this.auth.removeAuthTokenListener(this.I), this.I = null, this.u = null;
    }, 
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t.prototype.m = function() {
        var t = this.auth && this.auth.getUid();
        return Ve(null === t || "string" == typeof t), new b(t);
    }, t;
}(), D = /** @class */ function() {
    function t(t, e) {
        this.P = t, this.V = e, this.type = "FirstParty", this.user = b.h;
    }
    return Object.defineProperty(t.prototype, "o", {
        get: function() {
            var t = {
                "X-Goog-AuthUser": this.V
            }, e = this.P.auth.g([]);
            return e && (t.Authorization = e), t;
        },
        enumerable: !0,
        configurable: !0
    }), t;
}(), k = /** @class */ function() {
    function t(t, e) {
        this.P = t, this.V = e;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new D(this.P, this.V));
    }, t.prototype.l = function(t) {
        // Fire with initial uid.
        t(b.h);
    }, t.prototype.T = function() {}, t.prototype._ = function() {}, t;
}(), S = /** @class */ function() {
    function t(t, e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new I(T.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new I(T.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new I(T.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new I(T.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    return t.now = function() {
        return t.fromMillis(Date.now());
    }, t.fromDate = function(e) {
        return t.fromMillis(e.getTime());
    }, t.fromMillis = function(e) {
        var n = Math.floor(e / 1e3);
        return new t(n, 1e6 * (e - 1e3 * n));
    }, t.prototype.toDate = function() {
        return new Date(this.toMillis());
    }, t.prototype.toMillis = function() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }, t.prototype.p = function(t) {
        return this.seconds === t.seconds ? Pe(this.nanoseconds, t.nanoseconds) : Pe(this.seconds, t.seconds);
    }, t.prototype.isEqual = function(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }, t.prototype.toString = function() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }, t.prototype.valueOf = function() {
        // This method returns a string of the form <seconds>.<nanoseconds> where <seconds> is
        // translated to have a non-negative value and both <seconds> and <nanoseconds> are left-padded
        // with zeroes to be a consistent length. Strings with this format then have a lexiographical
        // ordering that matches the expected ordering. The <seconds> translation is done to avoid
        // having a leading negative sign (i.e. a leading '-' character) in its string representation,
        // which would affect its lexiographical ordering.
        var t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }, t;
}(), x = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.v = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new S(0, 0));
    }, t.prototype.S = function(t) {
        return this.timestamp.p(t.timestamp);
    }, t.prototype.isEqual = function(t) {
        return this.timestamp.isEqual(t.timestamp);
    }, 
    /** Returns a number representation of the version for use in spec tests. */ t.prototype.D = function() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t.prototype.toString = function() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t.prototype.C = function() {
        return this.timestamp;
    }, t;
}(), V = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && xe(), void 0 === n ? n = t.length - e : n > t.length - e && xe(), 
        this.segments = t, this.offset = e, this.F = n;
    }
    return Object.defineProperty(t.prototype, "length", {
        get: function() {
            return this.F;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return 0 === t.N(this, e);
    }, t.prototype.child = function(e) {
        var n = this.segments.slice(this.offset, this.limit());
        return e instanceof t ? e.forEach((function(t) {
            n.push(t);
        })) : n.push(e), this.k(n);
    }, 
    /** The index of one past the last segment of the path. */ t.prototype.limit = function() {
        return this.offset + this.length;
    }, t.prototype.$ = function(t) {
        return t = void 0 === t ? 1 : t, this.k(this.segments, this.offset + t, this.length - t);
    }, t.prototype.M = function() {
        return this.k(this.segments, this.offset, this.length - 1);
    }, t.prototype.L = function() {
        return this.segments[this.offset];
    }, t.prototype.O = function() {
        return this.get(this.length - 1);
    }, t.prototype.get = function(t) {
        return this.segments[this.offset + t];
    }, t.prototype.B = function() {
        return 0 === this.length;
    }, t.prototype.q = function(t) {
        if (t.length < this.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.U = function(t) {
        if (this.length + 1 !== t.length) return !1;
        for (var e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }, t.prototype.forEach = function(t) {
        for (var e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }, t.prototype.W = function() {
        return this.segments.slice(this.offset, this.limit());
    }, t.N = function(t, e) {
        for (var n = Math.min(t.length, e.length), r = 0; r < n; r++) {
            var i = t.get(r), o = e.get(r);
            if (i < o) return -1;
            if (i > o) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }, t;
}(), R = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.k = function(t, e, r) {
        return new n(t, e, r);
    }, n.prototype.j = function() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.W().join("/");
    }, n.prototype.toString = function() {
        return this.j();
    }, 
    /**
     * Creates a resource path from the given slash-delimited string.
     */
    n.K = function(t) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        if (t.indexOf("//") >= 0) throw new I(T.INVALID_ARGUMENT, "Invalid path (" + t + "). Paths must not contain // in them.");
        // We may still have an empty segment at the beginning or end if they had a
        // leading or trailing slash (which we allow).
                return new n(t.split("/").filter((function(t) {
            return t.length > 0;
        })));
    }, n;
}(V);

/**
 * An error class used for Firestore-generated errors. Ideally we should be
 * using FirebaseError, but integrating with it is overly arduous at the moment,
 * so we define our own compatible error class (with a `name` of 'FirebaseError'
 * and compatible `code` and `message` fields.)
 */ R.G = new R([]);

var O = /^[_a-zA-Z][_a-zA-Z0-9]*$/, P = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.k = function(t, e, r) {
        return new n(t, e, r);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.H = function(t) {
        return O.test(t);
    }, n.prototype.j = function() {
        return this.W().map((function(t) {
            return t = t.replace("\\", "\\\\").replace("`", "\\`"), n.H(t) || (t = "`" + t + "`"), 
            t;
        })).join(".");
    }, n.prototype.toString = function() {
        return this.j();
    }, 
    /**
     * Returns true if this field references the key of a document.
     */
    n.prototype.Y = function() {
        return 1 === this.length && "__name__" === this.get(0);
    }, 
    /**
     * The field designating the key of a document.
     */
    n.J = function() {
        return new n([ "__name__" ]);
    }, 
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */
    n.X = function(t) {
        for (var e = [], r = "", i = 0, o = function() {
            if (0 === r.length) throw new I(T.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, s = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new I(T.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new I(T.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
        }
        if (o(), s) throw new I(T.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n;
}(V);

/** A dot-separated path for navigating sub-objects within a document. */ P.G = new P([]);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var L = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.Z = function(e) {
        return new t(R.K(e).$(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.tt = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === R.N(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.N = function(t, e) {
        return R.N(t.path, e.path);
    }, t.et = function(t) {
        return t.length % 2 == 0;
    }, 
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments The segments of the path to the document
     * @return A new instance of DocumentKey
     */
    t.st = function(e) {
        return new t(new R(e.slice()));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function U(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function q(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function M(t) {
    for (var e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 */ L.EMPTY = new L(new R([]));

var C = /** @class */ function() {
    function t(t) {
        this.it = t;
    }
    return t.fromBase64String = function(e) {
        return new t(Ie.nt().atob(e));
    }, t.fromUint8Array = function(e) {
        return new t(
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            for (var e = "", n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }(e));
    }, t.prototype.toBase64 = function() {
        return Ie.nt().btoa(this.it);
    }, t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.it);
    }, t.prototype.rt = function() {
        return 2 * this.it.length;
    }, t.prototype.S = function(t) {
        return Pe(this.it, t.it);
    }, t.prototype.isEqual = function(t) {
        return this.it === t.it;
    }, t;
}();

function F(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function j(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return -0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value The value to test for being an integer and in the safe range
 */ function B(t) {
    return "number" == typeof t && Number.isInteger(t) && !j(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   TransformMutation (see TransformMutation.applyTo()). They can only exist in
 *   the local view of a document. Therefore they do not need to be parsed or
 *   serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ function G(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the local time at which this timestamp was first set.
 */ function z(t) {
    var e = Z(t.mapValue.fields.__local_write_time__.timestampValue);
    return new S(e.seconds, e.nanos);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// A RegExp matching ISO 8601 UTC timestamps with optional fraction.
C.ht = new C("");

var Q = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/** Extracts the backend's type order for the provided value. */ function W(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? G(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : xe();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function K(t, e) {
    var n = W(t);
    if (n !== W(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return z(t).isEqual(z(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = Z(t.timestampValue), r = Z(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return tt(t.bytesValue).isEqual(tt(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return J(t.geoPointValue.latitude) === J(e.geoPointValue.latitude) && J(t.geoPointValue.longitude) === J(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return J(t.integerValue) === J(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = J(t.doubleValue), r = J(e.doubleValue);
                return n === r ? j(n) === j(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return Le(t.arrayValue.values || [], e.arrayValue.values || [], K);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (U(n) !== U(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !K(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return xe();
    }
}

function Y(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return K(t, e);
    }));
}

function H(t, e) {
    var n = W(t), r = W(e);
    if (n !== r) return Pe(n, r);
    switch (n) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return Pe(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = J(t.integerValue || t.doubleValue), r = J(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return X(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return X(z(t), z(e));

      case 5 /* StringValue */ :
        return Pe(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = tt(t), r = tt(e);
            return n.S(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = Pe(n[i], r[i]);
                if (0 !== o) return o;
            }
            return Pe(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = Pe(J(t.latitude), J(e.latitude));
            return 0 !== n ? n : Pe(J(t.longitude), J(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = H(n[i], r[i]);
                if (o) return o;
            }
            return Pe(n.length, r.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.fields || {}, r = Object.keys(n), i = e.fields || {}, o = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
                        r.sort(), o.sort();
            for (var s = 0; s < r.length && s < o.length; ++s) {
                var u = Pe(r[s], o[s]);
                if (0 !== u) return u;
                var a = H(n[r[s]], i[o[s]]);
                if (0 !== a) return a;
            }
            return Pe(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw xe();
    }
}

function X(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return Pe(t, e);
    var n = Z(t), r = Z(e), i = Pe(n.seconds, r.seconds);
    return 0 !== i ? i : Pe(n.nanos, r.nanos);
}

function $(t) {
    return function t(e) {
        return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function(t) {
            var e = Z(t);
            return "time(" + e.seconds + "," + e.nanos + ")";
        }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? tt(e.bytesValue).toBase64() : "referenceValue" in e ? (r = e.referenceValue, 
        L.Z(r).toString()) : "geoPointValue" in e ? "geo(" + (n = e.geoPointValue).latitude + "," + n.longitude + ")" : "arrayValue" in e ? function(e) {
            for (var n = "[", r = !0, i = 0, o = e.values || []; i < o.length; i++) {
                var s = o[i];
                r ? r = !1 : n += ",", n += t(s);
            }
            return n + "]";
        }(e.arrayValue) : "mapValue" in e ? function(e) {
            for (
            // Iteration order in JavaScript is not guaranteed. To ensure that we generate
            // matching canonical IDs for identical maps, we need to sort the keys.
            var n = "{", r = !0, i = 0, o = Object.keys(e.fields || {}).sort(); i < o.length; i++) {
                var s = o[i];
                r ? r = !1 : n += ",", n += s + ":" + t(e.fields[s]);
            }
            return n + "}";
        }(e.mapValue) : xe();
        var n, r;
    }(t);
}

function Z(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (Ve(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = Q.exec(t);
        if (Ve(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            var r = n[1];
            r = (r + "000000000").substr(0, 9), e = Number(r);
        }
        // Parse the date to get the seconds.
                var i = new Date(t);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: J(t.seconds),
        nanos: J(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function J(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function tt(t) {
    return "string" == typeof t ? C.fromBase64String(t) : C.fromUint8Array(t);
}

/** Returns a reference value for the provided database and key. */ function et(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.j()
    };
}

/** Returns true if `value` is an IntegerValue . */ function nt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function rt(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function it(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function ot(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function st(t) {
    return !!t && "mapValue" in t;
}

/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Transforms a value into a server-generated timestamp. */ var ut = /** @class */ function() {
    function t() {}
    return t.prototype.ot = function(t, e) {
        return function(t, e) {
            var n = {
                fields: {
                    __type__: {
                        stringValue: "server_timestamp"
                    },
                    __local_write_time__: {
                        timestampValue: {
                            seconds: t.seconds,
                            nanos: t.nanoseconds
                        }
                    }
                }
            };
            return e && (n.fields.__previous_value__ = e), {
                mapValue: n
            };
        }(e, t);
    }, t.prototype.at = function(t, e) {
        return e;
    }, t.prototype.ut = function(t) {
        return null;
        // Server timestamps are idempotent and don't require a base value.
        }, t.prototype.isEqual = function(e) {
        return e instanceof t;
    }, t;
}();

ut.instance = new ut;

/** Transforms an array value via a union operation. */
var at = /** @class */ function() {
    function t(t) {
        this.elements = t;
    }
    return t.prototype.ot = function(t, e) {
        return this.apply(t);
    }, t.prototype.at = function(t, e) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return this.apply(t);
    }, t.prototype.apply = function(t) {
        for (var e = ft(t), n = function(t) {
            e.some((function(e) {
                return K(e, t);
            })) || e.push(t);
        }, r = 0, i = this.elements; r < i.length; r++) {
            n(i[r]);
        }
        return {
            arrayValue: {
                values: e
            }
        };
    }, t.prototype.ut = function(t) {
        return null;
        // Array transforms are idempotent and don't require a base value.
        }, t.prototype.isEqual = function(e) {
        return e instanceof t && Le(this.elements, e.elements, K);
    }, t;
}(), ht = /** @class */ function() {
    function t(t) {
        this.elements = t;
    }
    return t.prototype.ot = function(t, e) {
        return this.apply(t);
    }, t.prototype.at = function(t, e) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return this.apply(t);
    }, t.prototype.apply = function(t) {
        for (var e = ft(t), n = function(t) {
            e = e.filter((function(e) {
                return !K(e, t);
            }));
        }, r = 0, i = this.elements; r < i.length; r++) {
            n(i[r]);
        }
        return {
            arrayValue: {
                values: e
            }
        };
    }, t.prototype.ut = function(t) {
        return null;
        // Array transforms are idempotent and don't require a base value.
        }, t.prototype.isEqual = function(e) {
        return e instanceof t && Le(this.elements, e.elements, K);
    }, t;
}(), ct = /** @class */ function() {
    function t(t, e) {
        this.serializer = t, this.ct = e;
    }
    return t.prototype.ot = function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = this.ut(t), r = this.asNumber(n) + this.asNumber(this.ct);
        return nt(n) && nt(this.ct) ? this.serializer._t(r) : this.serializer.lt(r);
    }, t.prototype.at = function(t, e) {
        return e;
    }, 
    /**
     * Inspects the provided value, returning the provided value if it is already
     * a NumberValue, otherwise returning a coerced value of 0.
     */
    t.prototype.ut = function(t) {
        return nt(e = t) || function(t) {
            return !!t && "doubleValue" in t;
        }(e) ? t : {
            integerValue: 0
        };
        var e;
    }, t.prototype.isEqual = function(e) {
        return e instanceof t && K(this.ct, e.ct);
    }, t.prototype.asNumber = function(t) {
        return J(t.integerValue || t.doubleValue);
    }, t;
}();

/** Transforms an array value via a remove operation. */ function ft(t) {
    return rt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ var lt = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(P.N)
        /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */;
    }
    return t.prototype.dt = function(t) {
        for (var e = 0, n = this.fields; e < n.length; e++) {
            if (n[e].q(t)) return !0;
        }
        return !1;
    }, t.prototype.isEqual = function(t) {
        return Le(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), pt = /** @class */ function() {
    function t(t, e) {
        this.field = t, this.transform = e;
    }
    return t.prototype.isEqual = function(t) {
        return this.field.isEqual(t.field) && this.transform.isEqual(t.transform);
    }, t;
}(), dt = function(
/**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
t, 
/**
     * The resulting fields returned from the backend after a
     * TransformMutation has been committed. Contains one FieldValue for each
     * FieldTransform that was in the mutation.
     *
     * Will be null if the mutation was not a TransformMutation.
     */
e) {
    this.version = t, this.transformResults = e;
}, yt = /** @class */ function() {
    function t(t, e) {
        this.updateTime = t, this.exists = e
        /** Creates a new empty Precondition. */;
    }
    return t.ft = function() {
        return new t;
    }, 
    /** Creates a new Precondition with an exists flag. */ t.exists = function(e) {
        return new t(void 0, e);
    }, 
    /** Creates a new Precondition based on a version a document exists at. */ t.updateTime = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "Tt", {
        /** Returns whether this Precondition is empty. */ get: function() {
            return void 0 === this.updateTime && void 0 === this.exists;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Returns true if the preconditions is valid for the given document
     * (or null if no document is available).
     */
    t.prototype.Et = function(t) {
        return void 0 !== this.updateTime ? t instanceof kt && t.version.isEqual(this.updateTime) : void 0 === this.exists || this.exists === t instanceof kt;
    }, t.prototype.isEqual = function(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }, t;
}(), vt = /** @class */ function() {
    function t() {}
    return t.prototype.It = function(t) {}, 
    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */
    t.wt = function(t) {
        return t instanceof kt ? t.version : x.min();
    }, t;
}(), mt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).key = t, i.value = n, i.Rt = r, i.type = 0 /* Set */ , 
        i;
    }
    return t(n, e), n.prototype.at = function(t, e) {
        this.It(t);
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        var n = e.version;
        return new kt(this.key, n, this.value, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        if (this.It(t), !this.Rt.Et(t)) return t;
        var r = vt.wt(t);
        return new kt(this.key, r, this.value, {
            At: !0
        });
    }, n.prototype.Pt = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.value.isEqual(t.value) && this.Rt.isEqual(t.Rt);
    }, n;
}(vt), gt = /** @class */ function(e) {
    function n(t, n, r, i) {
        var o = this;
        return (o = e.call(this) || this).key = t, o.data = n, o.Vt = r, o.Rt = i, o.type = 1 /* Patch */ , 
        o;
    }
    return t(n, e), n.prototype.at = function(t, e) {
        if (this.It(t), !this.Rt.Et(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new xt(this.key, e.version);
        var n = this.gt(t);
        return new kt(this.key, e.version, n, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        if (this.It(t), !this.Rt.Et(t)) return t;
        var r = vt.wt(t), i = this.gt(t);
        return new kt(this.key, r, i, {
            At: !0
        });
    }, n.prototype.Pt = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Vt.isEqual(t.Vt) && this.Rt.isEqual(t.Rt);
    }, 
    /**
     * Patches the data of document if available or creates a new document. Note
     * that this does not check whether or not the precondition of this patch
     * holds.
     */
    n.prototype.gt = function(t) {
        var e;
        return e = t instanceof kt ? t.data() : Tt.empty(), this.pt(e);
    }, n.prototype.pt = function(t) {
        var e = this, n = new It(t);
        return this.Vt.fields.forEach((function(t) {
            if (!t.B()) {
                var r = e.data.field(t);
                null !== r ? n.set(t, r) : n.delete(t);
            }
        })), n.yt();
    }, n;
}(vt), wt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.fieldTransforms = n, r.type = 2 /* Transform */ , 
        // NOTE: We set a precondition of exists: true as a safety-check, since we
        // always combine TransformMutations with a SetMutation or PatchMutation which
        // (if successful) should end up with an existing document.
        r.Rt = yt.exists(!0), r;
    }
    return t(n, e), n.prototype.at = function(t, e) {
        if (this.It(t), Ve(null != e.transformResults), !this.Rt.Et(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new xt(this.key, e.version);
        var n = this.bt(t), r = this.vt(t, e.transformResults), i = e.version, o = this.St(n.data(), r);
        return new kt(this.key, i, o, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        if (this.It(t), !this.Rt.Et(t)) return t;
        var r = this.bt(t), i = this.Dt(n, t, e), o = this.St(r.data(), i);
        return new kt(this.key, r.version, o, {
            At: !0
        });
    }, n.prototype.Pt = function(t) {
        for (var e = null, n = 0, r = this.fieldTransforms; n < r.length; n++) {
            var i = r[n], o = t instanceof kt ? t.field(i.field) : void 0, s = i.transform.ut(o || null);
            null != s && (e = null == e ? (new It).set(i.field, s) : e.set(i.field, s));
        }
        return e ? e.yt() : null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && Le(this.fieldTransforms, t.fieldTransforms, (function(t, e) {
            return t.isEqual(e);
        })) && this.Rt.isEqual(t.Rt);
    }, 
    /**
     * Asserts that the given MaybeDocument is actually a Document and verifies
     * that it matches the key for this mutation. Since we only support
     * transformations with precondition exists this method is guaranteed to be
     * safe.
     */
    n.prototype.bt = function(t) {
        return t;
    }, 
    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use after a
     * TransformMutation has been acknowledged by the server.
     *
     * @param baseDoc The document prior to applying this mutation batch.
     * @param serverTransformResults The transform results received by the server.
     * @return The transform results list.
     */
    n.prototype.vt = function(t, e) {
        var n = [];
        Ve(this.fieldTransforms.length === e.length);
        for (var r = 0; r < e.length; r++) {
            var i = this.fieldTransforms[r], o = i.transform, s = null;
            t instanceof kt && (s = t.field(i.field)), n.push(o.at(s, e[r]));
        }
        return n;
    }, 
    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use when applying a
     * TransformMutation locally.
     *
     * @param localWriteTime The local time of the transform mutation (used to
     *     generate ServerTimestampValues).
     * @param maybeDoc The current state of the document after applying all
     *     previous mutations.
     * @param baseDoc The document prior to applying this mutation batch.
     * @return The transform results list.
     */
    n.prototype.Dt = function(t, e, n) {
        for (var r = [], i = 0, o = this.fieldTransforms; i < o.length; i++) {
            var s = o[i], u = s.transform, a = null;
            e instanceof kt && (a = e.field(s.field)), null === a && n instanceof kt && (
            // If the current document does not contain a value for the mutated
            // field, use the value that existed before applying this mutation
            // batch. This solves an edge case where a PatchMutation clears the
            // values in a nested map before the TransformMutation is applied.
            a = n.field(s.field)), r.push(u.ot(a, t));
        }
        return r;
    }, n.prototype.St = function(t, e) {
        for (var n = new It(t), r = 0; r < this.fieldTransforms.length; r++) {
            var i = this.fieldTransforms[r].field;
            n.set(i, e[r]);
        }
        return n.yt();
    }, n;
}(vt), Et = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.Rt = n, r.type = 3 /* Delete */ , r;
    }
    return t(n, e), n.prototype.at = function(t, e) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        return this.It(t), new St(this.key, e.version, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        return this.It(t), this.Rt.Et(t) ? new St(this.key, x.min()) : t;
    }, n.prototype.Pt = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Rt.isEqual(t.Rt);
    }, n;
}(vt), bt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).key = t, r.Rt = n, r.type = 4 /* Verify */ , r;
    }
    return t(n, e), n.prototype.at = function(t, e) {
        xe();
    }, n.prototype.ot = function(t, e, n) {
        xe();
    }, n.prototype.Pt = function(t) {
        xe();
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Rt.isEqual(t.Rt);
    }, n;
}(vt), Tt = /** @class */ function() {
    function t(t) {
        this.proto = t;
    }
    return t.empty = function() {
        return new t({
            mapValue: {}
        });
    }, 
    /**
     * Returns the value at the given path or null.
     *
     * @param path the path to search
     * @return The value at the path or if there it doesn't exist.
     */
    t.prototype.field = function(t) {
        if (t.B()) return this.proto;
        for (var e = this.proto, n = 0; n < t.length - 1; ++n) {
            if (!e.mapValue.fields) return null;
            if (!st(e = e.mapValue.fields[t.get(n)])) return null;
        }
        return (e = (e.mapValue.fields || {})[t.O()]) || null;
    }, t.prototype.isEqual = function(t) {
        return K(this.proto, t.proto);
    }, t;
}(), It = /** @class */ function() {
    /**
     * @param baseObject The object to mutate.
     */
    function t(t) {
        void 0 === t && (t = Tt.empty()), this.Ct = t, 
        /** A map that contains the accumulated changes in this builder. */
        this.Ft = new Map;
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path The field path to set.
     * @param value The value to set.
     * @return The current Builder instance.
     */    return t.prototype.set = function(t, e) {
        return this.Nt(t, e), this;
    }, 
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path The field path to remove.
     * @return The current Builder instance.
     */
    t.prototype.delete = function(t) {
        return this.Nt(t, null), this;
    }, 
    /**
     * Adds `value` to the overlay map at `path`. Creates nested map entries if
     * needed.
     */
    t.prototype.Nt = function(t, e) {
        for (var n = this.Ft, r = 0; r < t.length - 1; ++r) {
            var i = t.get(r), o = n.get(i);
            o instanceof Map ? 
            // Re-use a previously created map
            n = o : o && 10 /* ObjectValue */ === W(o) ? (
            // Convert the existing Protobuf MapValue into a map
            o = new Map(Object.entries(o.mapValue.fields || {})), n.set(i, o), n = o) : (
            // Create an empty map to represent the current nesting level
            o = new Map, n.set(i, o), n = o);
        }
        n.set(t.O(), e);
    }, 
    /** Returns an ObjectValue with all mutations applied. */ t.prototype.yt = function() {
        var t = this.kt(P.G, this.Ft);
        return null != t ? new Tt(t) : this.Ct;
    }, 
    /**
     * Applies any overlays from `currentOverlays` that exist at `currentPath`
     * and returns the merged data at `currentPath` (or null if there were no
     * changes).
     *
     * @param currentPath The path at the current nesting level. Can be set to
     * FieldValue.EMPTY_PATH to represent the root.
     * @param currentOverlays The overlays at the current nesting level in the
     * same format as `overlayMap`.
     * @return The merged data at `currentPath` or null if no modifications
     * were applied.
     */
    t.prototype.kt = function(t, e) {
        var n = this, r = !1, i = this.Ct.field(t), o = st(i) ? // If there is already data at the current path, base our
        Object.assign({}, i.mapValue.fields) : {};
        return e.forEach((function(e, i) {
            if (e instanceof Map) {
                var s = n.kt(t.child(i), e);
                null != s && (o[i] = s, r = !0);
            } else null !== e ? (o[i] = e, r = !0) : o.hasOwnProperty(i) && (delete o[i], r = !0);
        })), r ? {
            mapValue: {
                fields: o
            }
        } : null;
    }, t;
}();

/** A field path and the TransformOperation to perform upon it. */
/**
 * Returns a FieldMask built from all fields in a MapValue.
 */
function Nt(t) {
    var e = [];
    return q(t.fields || {}, (function(t, n) {
        var r = new P([ t ]);
        if (st(n)) {
            var i = Nt(n.mapValue).fields;
            if (0 === i.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(r); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (var o = 0, s = i; o < s.length; o++) {
                var u = s[o];
                e.push(r.child(u));
            }
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(r);
    })), new lt(e)
    /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * The result of a lookup for a given path may be an existing document or a
 * marker that this document does not exist at a given version.
 */;
}

var At, _t, Dt = function(t, e) {
    this.key = t, this.version = e;
}, kt = /** @class */ function(e) {
    function n(t, n, r, i) {
        var o = this;
        return (o = e.call(this, t, n) || this).$t = r, o.At = !!i.At, o.hasCommittedMutations = !!i.hasCommittedMutations, 
        o;
    }
    return t(n, e), n.prototype.field = function(t) {
        return this.$t.field(t);
    }, n.prototype.data = function() {
        return this.$t;
    }, n.prototype.Mt = function() {
        return this.$t.proto;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.At === t.At && this.hasCommittedMutations === t.hasCommittedMutations && this.$t.isEqual(t.$t);
    }, n.prototype.toString = function() {
        return "Document(" + this.key + ", " + this.version + ", " + this.$t.toString() + ", {hasLocalMutations: " + this.At + "}), {hasCommittedMutations: " + this.hasCommittedMutations + "})";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return this.At || this.hasCommittedMutations;
        },
        enumerable: !0,
        configurable: !0
    }), n;
}(Dt), St = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n) || this).hasCommittedMutations = !(!r || !r.hasCommittedMutations), 
        i;
    }
    return t(n, e), n.prototype.toString = function() {
        return "NoDocument(" + this.key + ", " + this.version + ")";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return this.hasCommittedMutations;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.isEqual = function(t) {
        return t instanceof n && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
    }, n;
}(Dt), xt = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.toString = function() {
        return "UnknownDocument(" + this.key + ", " + this.version + ")";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return !0;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.isEqual = function(t) {
        return t instanceof n && t.version.isEqual(this.version) && t.key.isEqual(this.key);
    }, n;
}(Dt), Vt = /** @class */ function() {
    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this constructor, because `Query` provides an implicit `orderBy`
     * property.
     */
    function t(t, e, n, r, i, o, s) {
        void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
        void 0 === i && (i = null), void 0 === o && (o = null), void 0 === s && (s = null), 
        this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = r, this.limit = i, 
        this.startAt = o, this.endAt = s, this.Lt = null;
    }
    return t.prototype.canonicalId = function() {
        if (null === this.Lt) {
            var t = this.path.j();
            null !== this.collectionGroup && (t += "|cg:" + this.collectionGroup), t += "|f:", 
            t += this.filters.map((function(t) {
                return t.canonicalId();
            })).join(","), t += "|ob:", t += this.orderBy.map((function(t) {
                return t.canonicalId();
            })).join(","), F(this.limit) || (t += "|l:", t += this.limit), this.startAt && (t += "|lb:", 
            t += this.startAt.canonicalId()), this.endAt && (t += "|ub:", t += this.endAt.canonicalId()), 
            this.Lt = t;
        }
        return this.Lt;
    }, t.prototype.toString = function() {
        var t = this.path.j();
        return null !== this.collectionGroup && (t += " collectionGroup=" + this.collectionGroup), 
        this.filters.length > 0 && (t += ", filters: [" + this.filters.join(", ") + "]"), 
        F(this.limit) || (t += ", limit: " + this.limit), this.orderBy.length > 0 && (t += ", orderBy: [" + this.orderBy.join(", ") + "]"), 
        this.startAt && (t += ", startAt: " + this.startAt.canonicalId()), this.endAt && (t += ", endAt: " + this.endAt.canonicalId()), 
        "Target(" + t + ")";
    }, t.prototype.isEqual = function(t) {
        if (this.limit !== t.limit) return !1;
        if (this.orderBy.length !== t.orderBy.length) return !1;
        for (var e = 0; e < this.orderBy.length; e++) if (!this.orderBy[e].isEqual(t.orderBy[e])) return !1;
        if (this.filters.length !== t.filters.length) return !1;
        for (var n = 0; n < this.filters.length; n++) if (!this.filters[n].isEqual(t.filters[n])) return !1;
        return this.collectionGroup === t.collectionGroup && !!this.path.isEqual(t.path) && !!(null !== this.startAt ? this.startAt.isEqual(t.startAt) : null === t.startAt) && (null !== this.endAt ? this.endAt.isEqual(t.endAt) : null === t.endAt);
    }, t.prototype.Ot = function() {
        return L.et(this.path) && null === this.collectionGroup && 0 === this.filters.length;
    }, t;
}(), Rt = /** @class */ function() {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    function t(t, e, n, r, i, o /* First */ , s, u) {
        void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
        void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === s && (s = null), 
        void 0 === u && (u = null), this.path = t, this.collectionGroup = e, this.xt = n, 
        this.filters = r, this.limit = i, this.Bt = o, this.startAt = s, this.endAt = u, 
        this.qt = null, 
        // The corresponding `Target` of this `Query` instance.
        this.Ut = null, this.startAt && this.Qt(this.startAt), this.endAt && this.Qt(this.endAt);
    }
    return t.Wt = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "orderBy", {
        get: function() {
            if (null === this.qt) {
                this.qt = [];
                var t = this.jt(), e = this.Kt();
                if (null !== t && null === e) 
                // In order to implicitly add key ordering, we must also add the
                // inequality filter field for it to be a valid query.
                // Note that the default inequality field and key ordering is ascending.
                t.Y() || this.qt.push(new Ft(t)), this.qt.push(new Ft(P.J(), "asc" /* ASCENDING */)); else {
                    for (var n = !1, r = 0, i = this.xt; r < i.length; r++) {
                        var o = i[r];
                        this.qt.push(o), o.field.Y() && (n = !0);
                    }
                    if (!n) {
                        // The order of the implicit key ordering always matches the last
                        // explicit order by
                        var s = this.xt.length > 0 ? this.xt[this.xt.length - 1].dir : "asc" /* ASCENDING */;
                        this.qt.push(new Ft(P.J(), s));
                    }
                }
            }
            return this.qt;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Gt = function(e) {
        var n = this.filters.concat([ e ]);
        return new t(this.path, this.collectionGroup, this.xt.slice(), n, this.limit, this.Bt, this.startAt, this.endAt);
    }, t.prototype.zt = function(e) {
        // TODO(dimond): validate that orderBy does not list the same key twice.
        var n = this.xt.concat([ e ]);
        return new t(this.path, this.collectionGroup, n, this.filters.slice(), this.limit, this.Bt, this.startAt, this.endAt);
    }, t.prototype.Ht = function(e) {
        return new t(this.path, this.collectionGroup, this.xt.slice(), this.filters.slice(), e, "F" /* First */ , this.startAt, this.endAt);
    }, t.prototype.Yt = function(e) {
        return new t(this.path, this.collectionGroup, this.xt.slice(), this.filters.slice(), e, "L" /* Last */ , this.startAt, this.endAt);
    }, t.prototype.Jt = function(e) {
        return new t(this.path, this.collectionGroup, this.xt.slice(), this.filters.slice(), this.limit, this.Bt, e, this.endAt);
    }, t.prototype.Xt = function(e) {
        return new t(this.path, this.collectionGroup, this.xt.slice(), this.filters.slice(), this.limit, this.Bt, this.startAt, e);
    }, 
    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */
    t.prototype.Zt = function(e) {
        return new t(e, 
        /*collectionGroup=*/ null, this.xt.slice(), this.filters.slice(), this.limit, this.Bt, this.startAt, this.endAt);
    }, 
    /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */
    t.prototype.te = function() {
        return 0 === this.filters.length && null === this.limit && null == this.startAt && null == this.endAt && (0 === this.xt.length || 1 === this.xt.length && this.xt[0].field.Y());
    }, 
    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    t.prototype.canonicalId = function() {
        return this.ee().canonicalId() + "|lt:" + this.Bt;
    }, t.prototype.toString = function() {
        return "Query(target=" + this.ee().toString() + "; limitType=" + this.Bt + ")";
    }, t.prototype.isEqual = function(t) {
        return this.ee().isEqual(t.ee()) && this.Bt === t.Bt;
    }, t.prototype.se = function(t, e) {
        for (var n = !1, r = 0, i = this.orderBy; r < i.length; r++) {
            var o = i[r], s = o.compare(t, e);
            if (0 !== s) return s;
            n = n || o.field.Y();
        }
        return 0;
    }, t.prototype.matches = function(t) {
        return this.ie(t) && this.ne(t) && this.re(t) && this.he(t);
    }, t.prototype.oe = function() {
        return !F(this.limit) && "F" /* First */ === this.Bt;
    }, t.prototype.ae = function() {
        return !F(this.limit) && "L" /* Last */ === this.Bt;
    }, t.prototype.Kt = function() {
        return this.xt.length > 0 ? this.xt[0].field : null;
    }, t.prototype.jt = function() {
        for (var t = 0, e = this.filters; t < e.length; t++) {
            var n = e[t];
            if (n instanceof Ot && n.ue()) return n.field;
        }
        return null;
    }, 
    // Checks if any of the provided Operators are included in the query and
    // returns the first one that is, or null if none are.
    t.prototype.ce = function(t) {
        for (var e = 0, n = this.filters; e < n.length; e++) {
            var r = n[e];
            if (r instanceof Ot && t.indexOf(r.op) >= 0) return r.op;
        }
        return null;
    }, t.prototype.Ot = function() {
        return this.ee().Ot();
    }, t.prototype._e = function() {
        return null !== this.collectionGroup;
    }, 
    /**
     * Converts this `Query` instance to it's corresponding `Target`
     * representation.
     */
    t.prototype.ee = function() {
        if (!this.Ut) if ("F" /* First */ === this.Bt) this.Ut = new Vt(this.path, this.collectionGroup, this.orderBy, this.filters, this.limit, this.startAt, this.endAt); else {
            for (
            // Flip the orderBy directions since we want the last results
            var t = [], e = 0, n = this.orderBy; e < n.length; e++) {
                var r = n[e], i = "desc" /* DESCENDING */ === r.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Ft(r.field, i));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                        var o = this.endAt ? new Ct(this.endAt.position, !this.endAt.before) : null, s = this.startAt ? new Ct(this.startAt.position, !this.startAt.before) : null;
            // Now return as a LimitType.First query.
                        this.Ut = new Vt(this.path, this.collectionGroup, t, this.filters, this.limit, o, s);
        }
        return this.Ut;
    }, t.prototype.ie = function(t) {
        var e = t.key.path;
        return null !== this.collectionGroup ? t.key.tt(this.collectionGroup) && this.path.q(e) : L.et(this.path) ? this.path.isEqual(e) : this.path.U(e);
    }, 
    /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */
    t.prototype.ne = function(t) {
        for (var e = 0, n = this.xt; e < n.length; e++) {
            var r = n[e];
            // order by key always matches
                        if (!r.field.Y() && null === t.field(r.field)) return !1;
        }
        return !0;
    }, t.prototype.re = function(t) {
        for (var e = 0, n = this.filters; e < n.length; e++) {
            if (!n[e].matches(t)) return !1;
        }
        return !0;
    }, 
    /**
     * Makes sure a document is within the bounds, if provided.
     */
    t.prototype.he = function(t) {
        return !(this.startAt && !this.startAt.le(this.orderBy, t) || this.endAt && this.endAt.le(this.orderBy, t));
    }, t.prototype.Qt = function(t) {}, t;
}(), Ot = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).field = t, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return t(n, e), n.create = function(t, e, r) {
        if (t.Y()) return "in" /* IN */ === e ? new Lt(t, r) : new Pt(t, e, r);
        if (it(r)) {
            if ("==" /* EQUAL */ !== e) throw new I(T.INVALID_ARGUMENT, "Invalid query. Null supports only equality comparisons.");
            return new n(t, e, r);
        }
        if (ot(r)) {
            if ("==" /* EQUAL */ !== e) throw new I(T.INVALID_ARGUMENT, "Invalid query. NaN supports only equality comparisons.");
            return new n(t, e, r);
        }
        return "array-contains" /* ARRAY_CONTAINS */ === e ? new Ut(t, r) : "in" /* IN */ === e ? new qt(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Mt(t, r) : new n(t, e, r);
    }, n.prototype.matches = function(t) {
        var e = t.field(this.field);
        // Only compare types with matching backend order (such as double and int).
                return null !== e && W(this.value) === W(e) && this.de(H(e, this.value));
    }, n.prototype.de = function(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return xe();
        }
    }, n.prototype.ue = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ ].indexOf(this.op) >= 0;
    }, n.prototype.canonicalId = function() {
        // TODO(b/29183165): Technically, this won't be unique if two values have
        // the same description, such as the int 3 and the string "3". So we should
        // add the types in here somehow, too.
        return this.field.j() + this.op.toString() + $(this.value);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.op === t.op && this.field.isEqual(t.field) && K(this.value, t.value);
    }, n.prototype.toString = function() {
        return this.field.j() + " " + this.op + " " + $(this.value);
    }, n;
}((function() {})), Pt = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this, t, n, r) || this).key = L.Z(r.referenceValue), i;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = L.N(t.key, this.key);
        return this.de(e);
    }, n;
}(Ot), Lt = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this, t, "in" /* IN */ , n) || this).keys = (n.arrayValue.values || []).map((function(t) {
            return L.Z(t.referenceValue);
        })), r;
    }
    return t(n, e), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(Ot), Ut = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.field(this.field);
        return rt(e) && Y(e.arrayValue, this.value);
    }, n;
}(Ot), qt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "in" /* IN */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = t.field(this.field);
        return null !== e && Y(this.value.arrayValue, e);
    }, n;
}(Ot), Mt = /** @class */ function(e) {
    function n(t, n) {
        return e.call(this, t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return t(n, e), n.prototype.matches = function(t) {
        var e = this, n = t.field(this.field);
        return !(!rt(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return Y(e.value.arrayValue, t);
        }));
    }, n;
}(Ot), Ct = /** @class */ function() {
    function t(t, e) {
        this.position = t, this.before = e;
    }
    return t.prototype.canonicalId = function() {
        // TODO(b/29183165): Make this collision robust.
        return (this.before ? "b" : "a") + ":" + this.position.map((function(t) {
            return $(t);
        })).join(",");
    }, 
    /**
     * Returns true if a document sorts before a bound using the provided sort
     * order.
     */
    t.prototype.le = function(t, e) {
        for (var n = 0, r = 0; r < this.position.length; r++) {
            var i = t[r], o = this.position[r];
            if (n = i.field.Y() ? L.N(L.Z(o.referenceValue), e.key) : H(o, e.field(i.field)), 
            "desc" /* DESCENDING */ === i.dir && (n *= -1), 0 !== n) break;
        }
        return this.before ? n <= 0 : n < 0;
    }, t.prototype.isEqual = function(t) {
        if (null === t) return !1;
        if (this.before !== t.before || this.position.length !== t.position.length) return !1;
        for (var e = 0; e < this.position.length; e++) if (!K(this.position[e], t.position[e])) return !1;
        return !0;
    }, t;
}(), Ft = /** @class */ function() {
    function t(t, e) {
        this.field = t, void 0 === e && (e = "asc" /* ASCENDING */), this.dir = e, this.fe = t.Y();
    }
    return t.prototype.compare = function(t, e) {
        var n = this.fe ? L.N(t.key, e.key) : function(t, e, n) {
            var r = e.field(t), i = n.field(t);
            return null !== r && null !== i ? H(r, i) : xe();
        }(this.field, t, e);
        switch (this.dir) {
          case "asc" /* ASCENDING */ :
            return n;

          case "desc" /* DESCENDING */ :
            return -1 * n;

          default:
            return xe();
        }
    }, t.prototype.canonicalId = function() {
        // TODO(b/29183165): Make this collision robust.
        return this.field.j() + this.dir.toString();
    }, t.prototype.toString = function() {
        return this.field.j() + " (" + this.dir + ")";
    }, t.prototype.isEqual = function(t) {
        return this.dir === t.dir && this.field.isEqual(t.field);
    }, t;
}(), jt = /** @class */ function() {
    function t(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    r, 
    /** The latest snapshot version seen for this target. */
    i
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , o
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , s) {
        void 0 === i && (i = x.min()), void 0 === o && (o = x.min()), void 0 === s && (s = C.ht), 
        this.target = t, this.targetId = e, this.Te = n, this.sequenceNumber = r, this.Ee = i, 
        this.lastLimboFreeSnapshotVersion = o, this.resumeToken = s;
    }
    /** Creates a new target data instance with an updated sequence number. */    return t.prototype.Ie = function(e) {
        return new t(this.target, this.targetId, this.Te, e, this.Ee, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }, 
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t.prototype.we = function(e, n) {
        return new t(this.target, this.targetId, this.Te, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e);
    }, 
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t.prototype.Re = function(e) {
        return new t(this.target, this.targetId, this.Te, this.sequenceNumber, this.Ee, e, this.resumeToken);
    }, t;
}(), Bt = 
// TODO(b/33078163): just use simplest form of existence filter for now
function(t) {
    this.count = t;
};

/**
 * Represents a document in Firestore with a key, version, data and whether the
 * data has local mutations applied to it.
 */
/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function Gt(t) {
    switch (t) {
      case T.OK:
        return xe();

      case T.CANCELLED:
      case T.UNKNOWN:
      case T.DEADLINE_EXCEEDED:
      case T.RESOURCE_EXHAUSTED:
      case T.INTERNAL:
      case T.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case T.UNAUTHENTICATED:
        return !1;

      case T.INVALID_ARGUMENT:
      case T.NOT_FOUND:
      case T.ALREADY_EXISTS:
      case T.PERMISSION_DENIED:
      case T.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case T.ABORTED:
      case T.OUT_OF_RANGE:
      case T.UNIMPLEMENTED:
      case T.DATA_LOSS:
        return !0;

      default:
        return xe();
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */ function zt(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return ke("GRPC error has no .code"), T.UNKNOWN;
    switch (t) {
      case At.OK:
        return T.OK;

      case At.CANCELLED:
        return T.CANCELLED;

      case At.UNKNOWN:
        return T.UNKNOWN;

      case At.DEADLINE_EXCEEDED:
        return T.DEADLINE_EXCEEDED;

      case At.RESOURCE_EXHAUSTED:
        return T.RESOURCE_EXHAUSTED;

      case At.INTERNAL:
        return T.INTERNAL;

      case At.UNAVAILABLE:
        return T.UNAVAILABLE;

      case At.UNAUTHENTICATED:
        return T.UNAUTHENTICATED;

      case At.INVALID_ARGUMENT:
        return T.INVALID_ARGUMENT;

      case At.NOT_FOUND:
        return T.NOT_FOUND;

      case At.ALREADY_EXISTS:
        return T.ALREADY_EXISTS;

      case At.PERMISSION_DENIED:
        return T.PERMISSION_DENIED;

      case At.FAILED_PRECONDITION:
        return T.FAILED_PRECONDITION;

      case At.ABORTED:
        return T.ABORTED;

      case At.OUT_OF_RANGE:
        return T.OUT_OF_RANGE;

      case At.UNIMPLEMENTED:
        return T.UNIMPLEMENTED;

      case At.DATA_LOSS:
        return T.DATA_LOSS;

      default:
        return xe();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (_t = At || (At = {}))[_t.OK = 0] = "OK", _t[_t.CANCELLED = 1] = "CANCELLED", 
_t[_t.UNKNOWN = 2] = "UNKNOWN", _t[_t.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
_t[_t.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", _t[_t.NOT_FOUND = 5] = "NOT_FOUND", 
_t[_t.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", _t[_t.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
_t[_t.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", _t[_t.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
_t[_t.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", _t[_t.ABORTED = 10] = "ABORTED", 
_t[_t.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", _t[_t.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
_t[_t.INTERNAL = 13] = "INTERNAL", _t[_t.UNAVAILABLE = 14] = "UNAVAILABLE", _t[_t.DATA_LOSS = 15] = "DATA_LOSS";

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
var Qt = /** @class */ function() {
    function t(t, e) {
        this.N = t, this.root = e || Kt.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.Ae = function(e, n) {
        return new t(this.N, this.root.Ae(e, n, this.N).me(null, null, Kt.Pe, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.N, this.root.remove(e, this.N).me(null, null, Kt.Pe, null, null));
    }, 
    // Returns the value of the node with the given key, or null.
    t.prototype.get = function(t) {
        for (var e = this.root; !e.B(); ) {
            var n = this.N(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }, 
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    t.prototype.indexOf = function(t) {
        for (
        // Number of nodes that were pruned when descending right
        var e = 0, n = this.root; !n.B(); ) {
            var r = this.N(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }, t.prototype.B = function() {
        return this.root.B();
    }, Object.defineProperty(t.prototype, "size", {
        // Returns the total number of nodes in the map.
        get: function() {
            return this.root.size;
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Returns the minimum key in the map.
    t.prototype.Ve = function() {
        return this.root.Ve();
    }, 
    // Returns the maximum key in the map.
    t.prototype.ge = function() {
        return this.root.ge();
    }, 
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.pe = function(t) {
        return this.root.pe(t);
    }, t.prototype.forEach = function(t) {
        this.pe((function(e, n) {
            return t(e, n), !1;
        }));
    }, t.prototype.toString = function() {
        var t = [];
        return this.pe((function(e, n) {
            return t.push(e + ":" + n), !1;
        })), "{" + t.join(", ") + "}";
    }, 
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ye = function(t) {
        return this.root.ye(t);
    }, 
    // Returns an iterator over the SortedMap.
    t.prototype.be = function() {
        return new Wt(this.root, null, this.N, !1);
    }, t.prototype.ve = function(t) {
        return new Wt(this.root, t, this.N, !1);
    }, t.prototype.Se = function() {
        return new Wt(this.root, null, this.N, !0);
    }, t.prototype.De = function(t) {
        return new Wt(this.root, t, this.N, !0);
    }, t;
}(), Wt = /** @class */ function() {
    function t(t, e, n, r) {
        this.Ce = r, this.Fe = [];
        for (var i = 1; !t.B(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        r && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.Ce ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.Fe.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
                        this.Fe.push(t), t = this.Ce ? t.right : t.left;
        }
    }
    return t.prototype.Ne = function() {
        var t = this.Fe.pop(), e = {
            key: t.key,
            value: t.value
        };
        if (this.Ce) for (t = t.left; !t.B(); ) this.Fe.push(t), t = t.right; else for (t = t.right; !t.B(); ) this.Fe.push(t), 
        t = t.left;
        return e;
    }, t.prototype.ke = function() {
        return this.Fe.length > 0;
    }, t.prototype.$e = function() {
        if (0 === this.Fe.length) return null;
        var t = this.Fe[this.Fe.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }, t;
}(), Kt = /** @class */ function() {
    function t(e, n, r, i, o) {
        this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : t.EMPTY, 
        this.right = null != o ? o : t.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
        return t.prototype.me = function(e, n, r, i, o) {
        return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t.prototype.B = function() {
        return !1;
    }, 
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.pe = function(t) {
        return this.left.pe(t) || t(this.key, this.value) || this.right.pe(t);
    }, 
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ye = function(t) {
        return this.right.ye(t) || t(this.key, this.value) || this.left.ye(t);
    }, 
    // Returns the minimum node in the tree.
    t.prototype.min = function() {
        return this.left.B() ? this : this.left.min();
    }, 
    // Returns the maximum key in the tree.
    t.prototype.Ve = function() {
        return this.min().key;
    }, 
    // Returns the maximum key in the tree.
    t.prototype.ge = function() {
        return this.right.B() ? this.key : this.right.ge();
    }, 
    // Returns new tree, with the key/value added.
    t.prototype.Ae = function(t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.me(null, null, null, r.left.Ae(t, e, n), null) : 0 === i ? r.me(null, e, null, null, null) : r.me(null, null, null, null, r.right.Ae(t, e, n))).Me();
    }, t.prototype.Le = function() {
        if (this.left.B()) return t.EMPTY;
        var e = this;
        return e.left.Oe() || e.left.left.Oe() || (e = e.xe()), (e = e.me(null, null, null, e.left.Le(), null)).Me();
    }, 
    // Returns new tree, with the specified item removed.
    t.prototype.remove = function(e, n) {
        var r, i = this;
        if (n(e, i.key) < 0) i.left.B() || i.left.Oe() || i.left.left.Oe() || (i = i.xe()), 
        i = i.me(null, null, null, i.left.remove(e, n), null); else {
            if (i.left.Oe() && (i = i.Be()), i.right.B() || i.right.Oe() || i.right.left.Oe() || (i = i.qe()), 
            0 === n(e, i.key)) {
                if (i.right.B()) return t.EMPTY;
                r = i.right.min(), i = i.me(r.key, r.value, null, null, i.right.Le());
            }
            i = i.me(null, null, null, null, i.right.remove(e, n));
        }
        return i.Me();
    }, t.prototype.Oe = function() {
        return this.color;
    }, 
    // Returns new tree after performing any needed rotations.
    t.prototype.Me = function() {
        var t = this;
        return t.right.Oe() && !t.left.Oe() && (t = t.Ue()), t.left.Oe() && t.left.left.Oe() && (t = t.Be()), 
        t.left.Oe() && t.right.Oe() && (t = t.Qe()), t;
    }, t.prototype.xe = function() {
        var t = this.Qe();
        return t.right.left.Oe() && (t = (t = (t = t.me(null, null, null, null, t.right.Be())).Ue()).Qe()), 
        t;
    }, t.prototype.qe = function() {
        var t = this.Qe();
        return t.left.left.Oe() && (t = (t = t.Be()).Qe()), t;
    }, t.prototype.Ue = function() {
        var e = this.me(null, null, t.RED, null, this.right.left);
        return this.right.me(null, null, this.color, e, null);
    }, t.prototype.Be = function() {
        var e = this.me(null, null, t.RED, this.left.right, null);
        return this.left.me(null, null, this.color, null, e);
    }, t.prototype.Qe = function() {
        var t = this.left.me(null, null, !this.left.color, null, null), e = this.right.me(null, null, !this.right.color, null, null);
        return this.me(null, null, !this.color, t, e);
    }, 
    // For testing.
    t.prototype.We = function() {
        var t = this.je();
        return Math.pow(2, t) <= this.size + 1;
    }, 
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t.prototype.je = function() {
        if (this.Oe() && this.left.Oe()) throw xe();
        if (this.right.Oe()) throw xe();
        var t = this.left.je();
        if (t !== this.right.je()) throw xe();
        return t + (this.Oe() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Kt.EMPTY = null, Kt.RED = !0, Kt.Pe = !1, 
// end LLRBEmptyNode
Kt.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw xe();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw xe();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw xe();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw xe();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw xe();
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Returns a copy of the current node.
    t.prototype.me = function(t, e, n, r, i) {
        return this;
    }, 
    // Returns a copy of the tree, with the specified key/value added.
    t.prototype.Ae = function(t, e, n) {
        return new Kt(t, e);
    }, 
    // Returns a copy of the tree, with the specified key removed.
    t.prototype.remove = function(t, e) {
        return this;
    }, t.prototype.B = function() {
        return !0;
    }, t.prototype.pe = function(t) {
        return !1;
    }, t.prototype.ye = function(t) {
        return !1;
    }, t.prototype.Ve = function() {
        return null;
    }, t.prototype.ge = function() {
        return null;
    }, t.prototype.Oe = function() {
        return !1;
    }, 
    // For testing.
    t.prototype.We = function() {
        return !0;
    }, t.prototype.je = function() {
        return 0;
    }, t;
}());

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
var Yt = /** @class */ function() {
    function t(t) {
        this.N = t, this.data = new Qt(this.N);
    }
    return t.prototype.has = function(t) {
        return null !== this.data.get(t);
    }, t.prototype.first = function() {
        return this.data.Ve();
    }, t.prototype.last = function() {
        return this.data.ge();
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.data.size;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.indexOf = function(t) {
        return this.data.indexOf(t);
    }, 
    /** Iterates elements in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.data.pe((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Iterates over `elem`s such that: range[0] <= elem < range[1]. */ t.prototype.Ke = function(t, e) {
        for (var n = this.data.ve(t[0]); n.ke(); ) {
            var r = n.Ne();
            if (this.N(r.key, t[1]) >= 0) return;
            e(r.key);
        }
    }, 
    /**
     * Iterates over `elem`s such that: start <= elem until false is returned.
     */
    t.prototype.Ge = function(t, e) {
        var n;
        for (n = void 0 !== e ? this.data.ve(e) : this.data.be(); n.ke(); ) if (!t(n.Ne().key)) return;
    }, 
    /** Finds the least element greater than or equal to `elem`. */ t.prototype.ze = function(t) {
        var e = this.data.ve(t);
        return e.ke() ? e.Ne().key : null;
    }, t.prototype.be = function() {
        return new Ht(this.data.be());
    }, t.prototype.ve = function(t) {
        return new Ht(this.data.ve(t));
    }, 
    /** Inserts or updates an element */ t.prototype.add = function(t) {
        return this.me(this.data.remove(t).Ae(t, !0));
    }, 
    /** Deletes an element */ t.prototype.delete = function(t) {
        return this.has(t) ? this.me(this.data.remove(t)) : this;
    }, t.prototype.B = function() {
        return this.data.B();
    }, t.prototype.He = function(t) {
        var e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((function(t) {
            e = e.add(t);
        })), e;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.data.be(), r = e.data.be(); n.ke(); ) {
            var i = n.Ne().key, o = r.Ne().key;
            if (0 !== this.N(i, o)) return !1;
        }
        return !0;
    }, t.prototype.W = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e);
        })), t;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            return t.push(e);
        })), "SortedSet(" + t.toString() + ")";
    }, t.prototype.me = function(e) {
        var n = new t(this.N);
        return n.data = e, n;
    }, t;
}(), Ht = /** @class */ function() {
    function t(t) {
        this.Ye = t;
    }
    return t.prototype.Ne = function() {
        return this.Ye.Ne().key;
    }, t.prototype.ke = function() {
        return this.Ye.ke();
    }, t;
}(), Xt = new Qt(L.N);

function $t() {
    return Xt;
}

function Zt() {
    return $t();
}

var Jt = new Qt(L.N);

function te() {
    return Jt;
}

var ee = new Qt(L.N);

function ne() {
    return ee;
}

var re = new Yt(L.N);

function ie() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = re, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var oe = new Yt(Pe);

function se() {
    return oe;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ var ue = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.N = t ? function(e, n) {
            return t(e, n) || L.N(e.key, n.key);
        } : function(t, e) {
            return L.N(t.key, e.key);
        }, this.Je = te(), this.Xe = new Qt(this.N)
        /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */;
    }
    return t.Ze = function(e) {
        return new t(e.N);
    }, t.prototype.has = function(t) {
        return null != this.Je.get(t);
    }, t.prototype.get = function(t) {
        return this.Je.get(t);
    }, t.prototype.first = function() {
        return this.Xe.Ve();
    }, t.prototype.last = function() {
        return this.Xe.ge();
    }, t.prototype.B = function() {
        return this.Xe.B();
    }, 
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t.prototype.indexOf = function(t) {
        var e = this.Je.get(t);
        return e ? this.Xe.indexOf(e) : -1;
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.Xe.size;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Iterates documents in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.Xe.pe((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Inserts or updates a document with the same key */ t.prototype.add = function(t) {
        // First remove the element if we have it.
        var e = this.delete(t.key);
        return e.me(e.Je.Ae(t.key, t), e.Xe.Ae(t, null));
    }, 
    /** Deletes a document with a given key */ t.prototype.delete = function(t) {
        var e = this.get(t);
        return e ? this.me(this.Je.remove(t), this.Xe.remove(e)) : this;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.Xe.be(), r = e.Xe.be(); n.ke(); ) {
            var i = n.Ne().key, o = r.Ne().key;
            if (!i.isEqual(o)) return !1;
        }
        return !0;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }, t.prototype.me = function(e, n) {
        var r = new t;
        return r.N = this.N, r.Je = e, r.Xe = n, r;
    }, t;
}(), ae = /** @class */ function() {
    function t() {
        this.ts = new Qt(L.N);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.ts.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.ts = this.ts.Ae(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.ts = this.ts.Ae(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.ts = this.ts.Ae(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.ts = this.ts.Ae(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.ts = this.ts.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.ts = this.ts.Ae(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.ts = this.ts.Ae(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        xe() : this.ts = this.ts.Ae(e, t);
    }, t.prototype.es = function() {
        var t = [];
        return this.ts.pe((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), he = /** @class */ function() {
    function t(t, e, n, r, i, o, s, u) {
        this.query = t, this.docs = e, this.ss = n, this.docChanges = r, this.ns = i, this.fromCache = o, 
        this.rs = s, this.hs = u
        /** Returns a view snapshot as if all documents in the snapshot were added. */;
    }
    return t.os = function(e, n, r, i) {
        var o = [];
        return n.forEach((function(t) {
            o.push({
                type: 0 /* Added */ ,
                doc: t
            });
        })), new t(e, n, ue.Ze(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.ns.B();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        if (!(this.fromCache === t.fromCache && this.rs === t.rs && this.ns.isEqual(t.ns) && this.query.isEqual(t.query) && this.docs.isEqual(t.docs) && this.ss.isEqual(t.ss))) return !1;
        var e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (var r = 0; r < e.length; r++) if (e[r].type !== n[r].type || !e[r].doc.isEqual(n[r].doc)) return !1;
        return !0;
    }, t;
}(), ce = /** @class */ function() {
    function t(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    r, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.Ee = t, this.as = e, this.us = n, this.cs = r, this._s = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
        return t.ls = function(e, n) {
        var r = new Map;
        return r.set(e, fe.ds(e, n)), new t(x.min(), r, se(), $t(), ie());
    }, t;
}(), fe = /** @class */ function() {
    function t(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    r, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.fs = e, this.Ts = n, this.Es = r, this.Is = i
        /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */;
    }
    return t.ds = function(e, n) {
        return new t(C.ht, n, ie(), ie(), ie());
    }, t;
}(), le = function(
/** The new document applies to all of these targets. */
t, 
/** The new document is removed from all of these targets. */
e, 
/** The key of the document for this change. */
n, 
/**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
r) {
    this.ws = t, this.removedTargetIds = e, this.key = n, this.Rs = r;
}, pe = function(t, e) {
    this.targetId = t, this.As = e;
}, de = function(
/** What kind of change occurred to the watch target. */
t, 
/** The target IDs that were added/removed/set. */
e, 
/**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
n
/** An RPC error indicating why the watch failed. */ , r) {
    void 0 === n && (n = C.ht), void 0 === r && (r = null), this.state = t, this.targetIds = e, 
    this.resumeToken = n, this.cause = r;
}, ye = /** @class */ function() {
    function t() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.ms = 0, 
        /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
        this.Ps = ge(), 
        /** See public getters for explanations of these fields. */
        this.Vs = C.ht, this.gs = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.ps = !0;
    }
    return Object.defineProperty(t.prototype, "fs", {
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */
        get: function() {
            return this.gs;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "resumeToken", {
        /** The last resume token sent to us for this target. */ get: function() {
            return this.Vs;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ys", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.ms;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "bs", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.ps;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.vs = function(t) {
        t.rt() > 0 && (this.ps = !0, this.Vs = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.Ss = function() {
        var t = ie(), e = ie(), n = ie();
        return this.Ps.forEach((function(r, i) {
            switch (i) {
              case 0 /* Added */ :
                t = t.add(r);
                break;

              case 2 /* Modified */ :
                e = e.add(r);
                break;

              case 1 /* Removed */ :
                n = n.add(r);
                break;

              default:
                xe();
            }
        })), new fe(this.Vs, this.gs, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.Ds = function() {
        this.ps = !1, this.Ps = ge();
    }, t.prototype.Cs = function(t, e) {
        this.ps = !0, this.Ps = this.Ps.Ae(t, e);
    }, t.prototype.Fs = function(t) {
        this.ps = !0, this.Ps = this.Ps.remove(t);
    }, t.prototype.Ns = function() {
        this.ms += 1;
    }, t.prototype.ks = function() {
        this.ms -= 1;
    }, t.prototype.$s = function() {
        this.ps = !0, this.gs = !0;
    }, t;
}(), ve = /** @class */ function() {
    function t(t) {
        this.Ms = t, 
        /** The internal state of all tracked targets. */
        this.Ls = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.Os = $t(), 
        /** A mapping of document keys to their set of target IDs. */
        this.xs = me(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.Bs = new Yt(Pe)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.qs = function(t) {
        for (var e = 0, n = t.ws; e < n.length; e++) {
            var r = n[e];
            t.Rs instanceof kt ? this.Us(r, t.Rs) : t.Rs instanceof St && this.Qs(r, t.key, t.Rs);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            var s = o[i];
            this.Qs(s, t.key, t.Rs);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.Ws = function(t) {
        var e = this;
        this.js(t, (function(n) {
            var r = e.Ks(n);
            switch (t.state) {
              case 0 /* NoChange */ :
                e.Gs(n) && r.vs(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.ks(), r.ys || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.Ds(), r.vs(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.ks(), r.ys || e.removeTarget(n);
                break;

              case 3 /* Current */ :
                e.Gs(n) && (r.$s(), r.vs(t.resumeToken));
                break;

              case 4 /* Reset */ :
                e.Gs(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.zs(n), r.vs(t.resumeToken));
                break;

              default:
                xe();
            }
        }));
    }, 
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */
    t.prototype.js = function(t, e) {
        var n = this;
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Ls.forEach((function(t, r) {
            n.Gs(r) && e(r);
        }));
    }, 
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t.prototype.Hs = function(t) {
        var e = t.targetId, n = t.As.count, r = this.Ys(e);
        if (r) {
            var i = r.target;
            if (i.Ot()) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new L(i.path);
                this.Qs(e, o, new St(o, x.min()));
            } else Ve(1 === n); else this.Js(e) !== n && (
            // Existence filter mismatch: We reset the mapping and raise a new
            // snapshot with `isFromCache:true`.
            this.zs(e), this.Bs = this.Bs.add(e));
        }
    }, 
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t.prototype.Xs = function(t) {
        var e = this, n = new Map;
        this.Ls.forEach((function(r, i) {
            var o = e.Ys(i);
            if (o) {
                if (r.fs && o.target.Ot()) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var s = new L(o.target.path);
                    null !== e.Os.get(s) || e.Zs(i, s) || e.Qs(i, s, new St(s, t));
                }
                r.bs && (n.set(i, r.Ss()), r.Ds());
            }
        }));
        var r = ie();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.xs.forEach((function(t, n) {
            var i = !0;
            n.Ge((function(t) {
                var n = e.Ys(t);
                return !n || 2 /* LimboResolution */ === n.Te || (i = !1, !1);
            })), i && (r = r.add(t));
        }));
        var i = new ce(t, n, this.Bs, this.Os, r);
        return this.Os = $t(), this.xs = me(), this.Bs = new Yt(Pe), i;
    }, 
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t.prototype.Us = function(t, e) {
        if (this.Gs(t)) {
            var n = this.Zs(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.Ks(t).Cs(e.key, n), this.Os = this.Os.Ae(e.key, e), this.xs = this.xs.Ae(e.key, this.ti(e.key).add(t));
        }
    }, 
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    t.prototype.Qs = function(t, e, n) {
        if (this.Gs(t)) {
            var r = this.Ks(t);
            this.Zs(t, e) ? r.Cs(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            r.Fs(e), this.xs = this.xs.Ae(e, this.ti(e).delete(t)), n && (this.Os = this.Os.Ae(e, n));
        }
    }, t.prototype.removeTarget = function(t) {
        this.Ls.delete(t);
    }, 
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t.prototype.Js = function(t) {
        var e = this.Ks(t).Ss();
        return this.Ms.ei(t).size + e.Ts.size - e.Is.size;
    }, 
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t.prototype.Ns = function(t) {
        this.Ks(t).Ns();
    }, t.prototype.Ks = function(t) {
        var e = this.Ls.get(t);
        return e || (e = new ye, this.Ls.set(t, e)), e;
    }, t.prototype.ti = function(t) {
        var e = this.xs.get(t);
        return e || (e = new Yt(Pe), this.xs = this.xs.Ae(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.Gs = function(t) {
        var e = null !== this.Ys(t);
        return e || De("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.Ys = function(t) {
        var e = this.Ls.get(t);
        return e && e.ys ? null : this.Ms.si(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.zs = function(t) {
        var e = this;
        this.Ls.set(t, new ye), this.Ms.ei(t).forEach((function(n) {
            e.Qs(t, n, /*updatedDocument=*/ null);
        }));
    }, 
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t.prototype.Zs = function(t, e) {
        return this.Ms.ei(t).has(e);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ function me() {
    return new Qt(L.N);
}

function ge() {
    return new Qt(L.N);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var we = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, Ee = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}, be = /** @class */ function() {
    function t(t, e) {
        this.ii = t, this.options = e;
    }
    return t.prototype.ni = function(t) {
        var e = void 0 === t.code ? T.UNKNOWN : zt(t.code);
        return new I(e, t.message || "");
    }, 
    /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */
    t.prototype.ri = function(t) {
        return this.options.hi || F(t) ? t : {
            value: t
        };
    }, 
    /**
     * Returns a number (or null) from a google.protobuf.Int32Value proto.
     */
    t.prototype.oi = function(t) {
        var e;
        return F(e = "object" == typeof t ? t.value : t) ? null : e;
    }, 
    /**
     * Returns an IntegerValue for `value`.
     */
    t.prototype._t = function(t) {
        return {
            integerValue: "" + t
        };
    }, 
    /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */
    t.prototype.lt = function(t) {
        if (this.options.hi) {
            if (isNaN(t)) return {
                doubleValue: "NaN"
            };
            if (t === 1 / 0) return {
                doubleValue: "Infinity"
            };
            if (t === -1 / 0) return {
                doubleValue: "-Infinity"
            };
        }
        return {
            doubleValue: j(t) ? "-0" : t
        };
    }, 
    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */
    t.prototype.ai = function(t) {
        return B(t) ? this._t(t) : this.lt(t);
    }, 
    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */
    t.prototype.C = function(t) {
        return this.options.hi ? new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + t.nanoseconds).slice(-9) + "Z" : {
            seconds: "" + t.seconds,
            nanos: t.nanoseconds
        };
    }, t.prototype.v = function(t) {
        var e = Z(t);
        return new S(e.seconds, e.nanos);
    }, 
    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    t.prototype.ui = function(t) {
        return this.options.hi ? t.toBase64() : t.toUint8Array();
    }, 
    /**
     * Returns a ByteString based on the proto string value.
     */
    t.prototype.ci = function(t) {
        return this.options.hi ? (Ve(void 0 === t || "string" == typeof t), C.fromBase64String(t || "")) : (Ve(void 0 === t || t instanceof Uint8Array), 
        C.fromUint8Array(t || new Uint8Array));
    }, t.prototype.toVersion = function(t) {
        return this.C(t.C());
    }, t.prototype.fromVersion = function(t) {
        return Ve(!!t), x.v(this.v(t));
    }, t.prototype._i = function(t, e) {
        return this.li(e || this.ii).child("documents").child(t).j();
    }, t.prototype.di = function(t) {
        var e = R.K(t);
        return Ve(Te(e)), e;
    }, t.prototype.fi = function(t) {
        return this._i(t.path);
    }, t.prototype.Z = function(t) {
        var e = this.di(t);
        return Ve(e.get(1) === this.ii.projectId), Ve(!e.get(3) && !this.ii.database || e.get(3) === this.ii.database), 
        new L(this.Ti(e));
    }, t.prototype.Ei = function(t) {
        return this._i(t);
    }, t.prototype.Ii = function(t) {
        var e = this.di(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
                return 4 === e.length ? R.G : this.Ti(e);
    }, Object.defineProperty(t.prototype, "wi", {
        get: function() {
            return new R([ "projects", this.ii.projectId, "databases", this.ii.database ]).j();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.li = function(t) {
        return new R([ "projects", t.projectId, "databases", t.database ]);
    }, t.prototype.Ti = function(t) {
        return Ve(t.length > 4 && "documents" === t.get(4)), t.$(5);
    }, 
    /** Creates an api.Document from key and fields (but no create/update time) */ t.prototype.Ri = function(t, e) {
        return {
            name: this.fi(t),
            fields: e.proto.mapValue.fields
        };
    }, t.prototype.Ai = function(t) {
        return {
            name: this.fi(t.key),
            fields: t.Mt().mapValue.fields,
            updateTime: this.C(t.version.C())
        };
    }, t.prototype.mi = function(t, e) {
        var n = this.Z(t.name), r = this.fromVersion(t.updateTime), i = new Tt({
            mapValue: {
                fields: t.fields
            }
        });
        return new kt(n, r, i, {
            hasCommittedMutations: !!e
        });
    }, t.prototype.Pi = function(t) {
        Ve(!!t.found), t.found.name, t.found.updateTime;
        var e = this.Z(t.found.name), n = this.fromVersion(t.found.updateTime), r = new Tt({
            mapValue: {
                fields: t.found.fields
            }
        });
        return new kt(e, n, r, {});
    }, t.prototype.Vi = function(t) {
        Ve(!!t.missing), Ve(!!t.readTime);
        var e = this.Z(t.missing), n = this.fromVersion(t.readTime);
        return new St(e, n);
    }, t.prototype.gi = function(t) {
        return "found" in t ? this.Pi(t) : "missing" in t ? this.Vi(t) : xe();
    }, t.prototype.pi = function(t) {
        var e;
        if ("targetChange" in t) {
            t.targetChange;
            // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
            // if unset
            var n = this.yi(t.targetChange.targetChangeType || "NO_CHANGE"), r = t.targetChange.targetIds || [], i = this.ci(t.targetChange.resumeToken), o = t.targetChange.cause, s = o && this.ni(o);
            e = new de(n, r, i, s || null);
        } else if ("documentChange" in t) {
            t.documentChange;
            var u = t.documentChange;
            u.document, u.document.name, u.document.updateTime;
            var a = this.Z(u.document.name), h = this.fromVersion(u.document.updateTime), c = new Tt({
                mapValue: {
                    fields: u.document.fields
                }
            }), f = new kt(a, h, c, {}), l = u.targetIds || [], p = u.removedTargetIds || [];
            e = new le(l, p, f.key, f);
        } else if ("documentDelete" in t) {
            t.documentDelete;
            var d = t.documentDelete;
            d.document;
            var y = this.Z(d.document), v = d.readTime ? this.fromVersion(d.readTime) : x.min(), m = new St(y, v), g = d.removedTargetIds || [];
            e = new le([], g, m.key, m);
        } else if ("documentRemove" in t) {
            t.documentRemove;
            var w = t.documentRemove;
            w.document;
            var E = this.Z(w.document), b = w.removedTargetIds || [];
            e = new le([], b, E, null);
        } else {
            if (!("filter" in t)) return xe();
            t.filter;
            var T = t.filter;
            T.targetId;
            var I = T.count || 0, N = new Bt(I), A = T.targetId;
            e = new pe(A, N);
        }
        return e;
    }, t.prototype.yi = function(t) {
        return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : xe();
    }, t.prototype.bi = function(t) {
        // We have only reached a consistent snapshot for the entire stream if there
        // is a read_time set and it applies to all targets (i.e. the list of
        // targets is empty). The backend is guaranteed to send such responses.
        if (!("targetChange" in t)) return x.min();
        var e = t.targetChange;
        return e.targetIds && e.targetIds.length ? x.min() : e.readTime ? this.fromVersion(e.readTime) : x.min();
    }, t.prototype.vi = function(t) {
        var e, n = this;
        if (t instanceof mt) e = {
            update: this.Ri(t.key, t.value)
        }; else if (t instanceof Et) e = {
            delete: this.fi(t.key)
        }; else if (t instanceof gt) e = {
            update: this.Ri(t.key, t.data),
            updateMask: this.Si(t.Vt)
        }; else if (t instanceof wt) e = {
            transform: {
                document: this.fi(t.key),
                fieldTransforms: t.fieldTransforms.map((function(t) {
                    return n.Di(t);
                }))
            }
        }; else {
            if (!(t instanceof bt)) return xe();
            e = {
                verify: this.fi(t.key)
            };
        }
        return t.Rt.Tt || (e.currentDocument = this.Ci(t.Rt)), e;
    }, t.prototype.Fi = function(t) {
        var e = this, n = t.currentDocument ? this.Ni(t.currentDocument) : yt.ft();
        if (t.update) {
            t.update.name;
            var r = this.Z(t.update.name), i = new Tt({
                mapValue: {
                    fields: t.update.fields
                }
            });
            if (t.updateMask) {
                var o = this.ki(t.updateMask);
                return new gt(r, i, o, n);
            }
            return new mt(r, i, n);
        }
        if (t.delete) {
            var s = this.Z(t.delete);
            return new Et(s, n);
        }
        if (t.transform) {
            var u = this.Z(t.transform.document), a = t.transform.fieldTransforms.map((function(t) {
                return e.$i(t);
            }));
            return Ve(!0 === n.exists), new wt(u, a);
        }
        if (t.verify) {
            var h = this.Z(t.verify);
            return new bt(h, n);
        }
        return xe();
    }, t.prototype.Ci = function(t) {
        return void 0 !== t.updateTime ? {
            updateTime: this.toVersion(t.updateTime)
        } : void 0 !== t.exists ? {
            exists: t.exists
        } : xe();
    }, t.prototype.Ni = function(t) {
        return void 0 !== t.updateTime ? yt.updateTime(this.fromVersion(t.updateTime)) : void 0 !== t.exists ? yt.exists(t.exists) : yt.ft();
    }, t.prototype.Mi = function(t, e) {
        // NOTE: Deletes don't have an updateTime.
        var n = t.updateTime ? this.fromVersion(t.updateTime) : this.fromVersion(e);
        n.isEqual(x.min()) && (
        // The Firestore Emulator currently returns an update time of 0 for
        // deletes of non-existing documents (rather than null). This breaks the
        // test "get deleted doc while offline with source=cache" as NoDocuments
        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
        // TODO(#2149): Remove this when Emulator is fixed
        n = this.fromVersion(e));
        var r = null;
        return t.transformResults && t.transformResults.length > 0 && (r = t.transformResults), 
        new dt(n, r);
    }, t.prototype.Li = function(t, e) {
        var n = this;
        return t && t.length > 0 ? (Ve(void 0 !== e), t.map((function(t) {
            return n.Mi(t, e);
        }))) : [];
    }, t.prototype.Di = function(t) {
        var e = t.transform;
        if (e instanceof ut) return {
            fieldPath: t.field.j(),
            setToServerValue: "REQUEST_TIME"
        };
        if (e instanceof at) return {
            fieldPath: t.field.j(),
            appendMissingElements: {
                values: e.elements
            }
        };
        if (e instanceof ht) return {
            fieldPath: t.field.j(),
            removeAllFromArray: {
                values: e.elements
            }
        };
        if (e instanceof ct) return {
            fieldPath: t.field.j(),
            increment: e.ct
        };
        throw xe();
    }, t.prototype.$i = function(t) {
        var e = null;
        if ("setToServerValue" in t) Ve("REQUEST_TIME" === t.setToServerValue), e = ut.instance; else if ("appendMissingElements" in t) {
            var n = t.appendMissingElements.values || [];
            e = new at(n);
        } else if ("removeAllFromArray" in t) {
            var r = t.removeAllFromArray.values || [];
            e = new ht(r);
        } else "increment" in t ? e = new ct(this, t.increment) : xe();
        var i = P.X(t.fieldPath);
        return new pt(i, e);
    }, t.prototype.Oi = function(t) {
        return {
            documents: [ this.Ei(t.path) ]
        };
    }, t.prototype.xi = function(t) {
        Ve(1 === t.documents.length);
        var e = t.documents[0];
        return Rt.Wt(this.Ii(e)).ee();
    }, t.prototype.Bi = function(t) {
        // Dissect the path into parent, collectionId, and optional key filter.
        var e = {
            structuredQuery: {}
        }, n = t.path;
        null !== t.collectionGroup ? (e.parent = this.Ei(n), e.structuredQuery.from = [ {
            collectionId: t.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = this.Ei(n.M()), e.structuredQuery.from = [ {
            collectionId: n.O()
        } ]);
        var r = this.qi(t.filters);
        r && (e.structuredQuery.where = r);
        var i = this.Ui(t.orderBy);
        i && (e.structuredQuery.orderBy = i);
        var o = this.ri(t.limit);
        return null !== o && (e.structuredQuery.limit = o), t.startAt && (e.structuredQuery.startAt = this.Qi(t.startAt)), 
        t.endAt && (e.structuredQuery.endAt = this.Qi(t.endAt)), e;
    }, t.prototype.Wi = function(t) {
        var e = this.Ii(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
        if (r > 0) {
            Ve(1 === r);
            var o = n.from[0];
            o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
        }
        var s = [];
        n.where && (s = this.ji(n.where));
        var u = [];
        n.orderBy && (u = this.Ki(n.orderBy));
        var a = null;
        n.limit && (a = this.oi(n.limit));
        var h = null;
        n.startAt && (h = this.Gi(n.startAt));
        var c = null;
        return n.endAt && (c = this.Gi(n.endAt)), new Rt(e, i, u, s, a, "F" /* First */ , h, c).ee();
    }, t.prototype.zi = function(t) {
        var e = this.Hi(t.Te);
        return null == e ? null : {
            "goog-listen-tags": e
        };
    }, t.prototype.Hi = function(t) {
        switch (t) {
          case 0 /* Listen */ :
            return null;

          case 1 /* ExistenceFilterMismatch */ :
            return "existence-filter-mismatch";

          case 2 /* LimboResolution */ :
            return "limbo-document";

          default:
            return xe();
        }
    }, t.prototype.ee = function(t) {
        var e, n = t.target;
        return (e = n.Ot() ? {
            documents: this.Oi(n)
        } : {
            query: this.Bi(n)
        }).targetId = t.targetId, t.resumeToken.rt() > 0 && (e.resumeToken = this.ui(t.resumeToken)), 
        e;
    }, t.prototype.qi = function(t) {
        var e = this;
        if (0 !== t.length) {
            var n = t.map((function(t) {
                return t instanceof Ot ? e.Yi(t) : xe();
            }));
            return 1 === n.length ? n[0] : {
                compositeFilter: {
                    op: "AND",
                    filters: n
                }
            };
        }
    }, t.prototype.ji = function(t) {
        var e = this;
        return t ? void 0 !== t.unaryFilter ? [ this.Ji(t) ] : void 0 !== t.fieldFilter ? [ this.Xi(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((function(t) {
            return e.ji(t);
        })).reduce((function(t, e) {
            return t.concat(e);
        })) : xe() : [];
    }, t.prototype.Ui = function(t) {
        var e = this;
        if (0 !== t.length) return t.map((function(t) {
            return e.Zi(t);
        }));
    }, t.prototype.Ki = function(t) {
        var e = this;
        return t.map((function(t) {
            return e.tn(t);
        }));
    }, t.prototype.Qi = function(t) {
        return {
            before: t.before,
            values: t.position
        };
    }, t.prototype.Gi = function(t) {
        var e = !!t.before, n = t.values || [];
        return new Ct(n, e);
    }, 
    // visible for testing
    t.prototype.en = function(t) {
        return we[t];
    }, 
    // visible for testing
    t.prototype.sn = function(t) {
        switch (t) {
          case "ASCENDING":
            return "asc" /* ASCENDING */;

          case "DESCENDING":
            return "desc" /* DESCENDING */;

          default:
            return;
        }
    }, 
    // visible for testing
    t.prototype.nn = function(t) {
        return Ee[t];
    }, t.prototype.rn = function(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          case "OPERATOR_UNSPECIFIED":
          default:
            return xe();
        }
    }, t.prototype.hn = function(t) {
        return {
            fieldPath: t.j()
        };
    }, t.prototype.on = function(t) {
        return P.X(t.fieldPath);
    }, 
    // visible for testing
    t.prototype.Zi = function(t) {
        return {
            field: this.hn(t.field),
            direction: this.en(t.dir)
        };
    }, t.prototype.tn = function(t) {
        return new Ft(this.on(t.field), this.sn(t.direction));
    }, t.prototype.Xi = function(t) {
        return Ot.create(this.on(t.fieldFilter.field), this.rn(t.fieldFilter.op), t.fieldFilter.value);
    }, 
    // visible for testing
    t.prototype.Yi = function(t) {
        if ("==" /* EQUAL */ === t.op) {
            if (ot(t.value)) return {
                unaryFilter: {
                    field: this.hn(t.field),
                    op: "IS_NAN"
                }
            };
            if (it(t.value)) return {
                unaryFilter: {
                    field: this.hn(t.field),
                    op: "IS_NULL"
                }
            };
        }
        return {
            fieldFilter: {
                field: this.hn(t.field),
                op: this.nn(t.op),
                value: t.value
            }
        };
    }, t.prototype.Ji = function(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            var e = this.on(t.unaryFilter.field);
            return Ot.create(e, "==" /* EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            var n = this.on(t.unaryFilter.field);
            return Ot.create(n, "==" /* EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "OPERATOR_UNSPECIFIED":
          default:
            return xe();
        }
    }, t.prototype.Si = function(t) {
        var e = [];
        return t.fields.forEach((function(t) {
            return e.push(t.j());
        })), {
            fieldPaths: e
        };
    }, t.prototype.ki = function(t) {
        var e = t.fieldPaths || [];
        return new lt(e.map((function(t) {
            return P.X(t);
        })));
    }, t;
}();

/**
 * Generates JsonObject values for the Datastore API suitable for sending to
 * either GRPC stub methods or via the JSON/HTTP REST API.
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */ function Te(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides singleton helpers where setup code can inject a platform at runtime.
 * setPlatform needs to be set before Firestore is used and must be set exactly
 * once.
 */ var Ie = /** @class */ function() {
    function t() {}
    return t.an = function(e) {
        t.platform && xe(), t.platform = e;
    }, t.nt = function() {
        return t.platform || xe(), t.platform;
    }, t;
}(), Ne = new o("@firebase/firestore");

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Helper methods are needed because variables can't be exported as read/write
function Ae() {
    return Ne.logLevel;
}

function _e(t) {
    Ne.logLevel = t;
}

function De(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (Ne.logLevel <= s.DEBUG) {
        var i = e.map(Se);
        Ne.debug.apply(Ne, r([ "Firestore (" + E + "): " + t ], i));
    }
}

function ke(t) {
    for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
    if (Ne.logLevel <= s.ERROR) {
        var i = e.map(Se);
        Ne.error.apply(Ne, r([ "Firestore (" + E + "): " + t ], i));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function Se(t) {
    if ("string" == typeof t) return t;
    var e = Ie.nt();
    try {
        return e.un(t);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function xe(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (" + E + ") INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw ke(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function Ve(t, e) {
    t || xe();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function Re(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Oe = /** @class */ function() {
    function t() {}
    return t.cn = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = Ie.nt()._n(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function Pe(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function Le(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function Ue(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var qe = 
/**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId The database to use.
     * @param persistenceKey A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host The Firestore backend host to connect to.
     * @param ssl Whether to use SSL when connecting.
     * @param forceLongPolling Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     */
function(t, e, n, r, i) {
    this.ii = t, this.persistenceKey = e, this.host = n, this.ssl = r, this.forceLongPolling = i;
}, Me = /** @class */ function() {
    function t(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    return Object.defineProperty(t.prototype, "ln", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return e instanceof t && e.projectId === this.projectId && e.database === this.database;
    }, t.prototype.S = function(t) {
        return Pe(this.projectId, t.projectId) || Pe(this.database, t.database);
    }, t;
}(), Ce = /** @class */ function() {
    function t(t) {
        this.dn = t, 
        /**
             * The inner map for a key -> value pair. Due to the possibility of
             * collisions we keep a list of entries that we do a linear search through
             * to find an actual match. Note that collisions should be rare, so we still
             * expect near constant time lookups in practice.
             */
        this.fn = {}
        /** Get a value for this key, or undefined if it does not exist. */;
    }
    return t.prototype.get = function(t) {
        var e = this.dn(t), n = this.fn[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r], s = o[0], u = o[1];
            if (s.isEqual(t)) return u;
        }
    }, t.prototype.has = function(t) {
        return void 0 !== this.get(t);
    }, 
    /** Put this key and value in the map. */ t.prototype.set = function(t, e) {
        var n = this.dn(t), r = this.fn[n];
        if (void 0 !== r) {
            for (var i = 0; i < r.length; i++) if (r[i][0].isEqual(t)) return void (r[i] = [ t, e ]);
            r.push([ t, e ]);
        } else this.fn[n] = [ [ t, e ] ];
    }, 
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t.prototype.delete = function(t) {
        var e = this.dn(t), n = this.fn[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (n[r][0].isEqual(t)) return 1 === n.length ? delete this.fn[e] : n.splice(r, 1), 
        !0;
        return !1;
    }, t.prototype.forEach = function(t) {
        q(this.fn, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], s = o[0], u = o[1];
                t(s, u);
            }
        }));
    }, t.prototype.B = function() {
        return M(this.fn);
    }, t;
}(), Fe = /** @class */ function() {
    /**
     * @param batchId The unique ID of this mutation batch.
     * @param localWriteTime The original write time of this mutation.
     * @param baseMutations Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    function t(t, e, n, r) {
        this.batchId = t, this.Tn = e, this.baseMutations = n, this.mutations = r
        /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to create a new remote document
     *
     * @param docKey The key of the document to apply mutations to.
     * @param maybeDoc The document to apply mutations to.
     * @param batchResult The result of applying the MutationBatch to the
     * backend.
     */;
    }
    return t.prototype.at = function(t, e, n) {
        for (var r = n.En, i = 0; i < this.mutations.length; i++) {
            var o = this.mutations[i];
            if (o.key.isEqual(t)) {
                var s = r[i];
                e = o.at(e, s);
            }
        }
        return e;
    }, 
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param docKey The key of the document to apply mutations to.
     * @param maybeDoc The document to apply mutations to.
     */
    t.prototype.ot = function(t, e) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (var n = 0, r = this.baseMutations; n < r.length; n++) {
            var i = r[n];
            i.key.isEqual(t) && (e = i.ot(e, e, this.Tn));
        }
        // Second, apply all user-provided mutations.
        for (var o = e, s = 0, u = this.mutations; s < u.length; s++) {
            var a = u[s];
            a.key.isEqual(t) && (e = a.ot(e, o, this.Tn));
        }
        return e;
    }, 
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */
    t.prototype.In = function(t) {
        var e = this, n = t;
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
                return this.mutations.forEach((function(r) {
            var i = e.ot(r.key, t.get(r.key));
            i && (n = n.Ae(r.key, i));
        })), n;
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), ie());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && Le(this.mutations, t.mutations, (function(t, e) {
            return t.isEqual(e);
        })) && Le(this.baseMutations, t.baseMutations, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), je = /** @class */ function() {
    function t(t, e, n, r, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    i) {
        this.batch = t, this.wn = e, this.En = n, this.streamToken = r, this.Rn = i
        /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=>version mapping (docVersions).
     */;
    }
    return t.from = function(e, n, r, i) {
        Ve(e.mutations.length === r.length);
        for (var o = ne(), s = e.mutations, u = 0; u < s.length; u++) o = o.Ae(s[u].key, r[u].version);
        return new t(e, n, r, i, o);
    }, t;
}(), Be = /** @class */ function() {
    function t(t) {
        var e = this;
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
                this.An = null, this.mn = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.Pn = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.Vn = !1, t((function(t) {
            e.Pn = !0, e.result = t, e.An && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            e.An(t);
        }), (function(t) {
            e.Pn = !0, e.error = t, e.mn && e.mn(t);
        }));
    }
    return t.prototype.catch = function(t) {
        return this.next(void 0, t);
    }, t.prototype.next = function(e, n) {
        var r = this;
        return this.Vn && xe(), this.Vn = !0, this.Pn ? this.error ? this.gn(n, this.error) : this.pn(e, this.result) : new t((function(t, i) {
            r.An = function(n) {
                r.pn(e, n).next(t, i);
            }, r.mn = function(e) {
                r.gn(n, e).next(t, i);
            };
        }));
    }, t.prototype.yn = function() {
        var t = this;
        return new Promise((function(e, n) {
            t.next(e, n);
        }));
    }, t.prototype.bn = function(e) {
        try {
            var n = e();
            return n instanceof t ? n : t.resolve(n);
        } catch (e) {
            return t.reject(e);
        }
    }, t.prototype.pn = function(e, n) {
        return e ? this.bn((function() {
            return e(n);
        })) : t.resolve(n);
    }, t.prototype.gn = function(e, n) {
        return e ? this.bn((function() {
            return e(n);
        })) : t.reject(n);
    }, t.resolve = function(e) {
        return new t((function(t, n) {
            t(e);
        }));
    }, t.reject = function(e) {
        return new t((function(t, n) {
            n(e);
        }));
    }, t.vn = function(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return new t((function(t, n) {
            var r = 0, i = 0, o = !1;
            e.forEach((function(e) {
                ++r, e.next((function() {
                    ++i, o && i === r && t();
                }), (function(t) {
                    return n(t);
                }));
            })), o = !0, i === r && t();
        }));
    }, 
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */
    t.Sn = function(e) {
        for (var n = t.resolve(!1), r = function(e) {
            n = n.next((function(n) {
                return n ? t.resolve(n) : e();
            }));
        }, i = 0, o = e; i < o.length; i++) {
            r(o[i]);
        }
        return n;
    }, t.forEach = function(t, e) {
        var n = this, r = [];
        return t.forEach((function(t, i) {
            r.push(e.call(n, t, i));
        })), this.vn(r);
    }, t;
}(), Ge = /** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.Dn = new Ce((function(t) {
            return t.toString();
        })), this.Cn = !1;
    }
    return Object.defineProperty(t.prototype, "readTime", {
        get: function() {
            return this.Fn;
        },
        set: function(t) {
            this.Fn = t;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.Nn = function(t, e) {
        this.kn(), this.readTime = e, this.Dn.set(t.key, t);
    }, 
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.$n = function(t, e) {
        this.kn(), e && (this.readTime = e), this.Dn.set(t, null);
    }, 
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction The transaction in which to perform any persistence
     *     operations.
     * @param documentKey The key of the entry to look up.
     * @return The cached Document or NoDocument entry, or null if we have nothing
     * cached.
     */
    t.prototype.Mn = function(t, e) {
        this.kn();
        var n = this.Dn.get(e);
        return void 0 !== n ? Be.resolve(n) : this.Ln(t, e);
    }, 
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys The keys of the entries to look up.
     * @return A map of cached `Document`s or `NoDocument`s, indexed by key. If an
     *     entry cannot be found, the corresponding key will be mapped to a null
     *     value.
     */
    t.prototype.getEntries = function(t, e) {
        return this.On(t, e);
    }, 
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t.prototype.apply = function(t) {
        return this.kn(), this.Cn = !0, this.xn(t);
    }, 
    /** Helper to assert this.changes is not null  */ t.prototype.kn = function() {}, 
    t;
}(), ze = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.", Qe = /** @class */ function() {
    function t() {
        this.Bn = [];
    }
    return t.prototype.qn = function(t) {
        this.Bn.push(t);
    }, t.prototype.Un = function() {
        this.Bn.forEach((function(t) {
            return t();
        }));
    }, t;
}(), We = /** @class */ function() {
    function t(t, e, n) {
        this.Qn = t, this.Wn = e, this.jn = n
        /**
     * Get the local view of the document identified by `key`.
     *
     * @return Local view of the document or null if we don't have any cached
     * state for it.
     */;
    }
    return t.prototype.Kn = function(t, e) {
        var n = this;
        return this.Wn.Gn(t, e).next((function(r) {
            return n.zn(t, e, r);
        }));
    }, 
    /** Internal version of `getDocument` that allows reusing batches. */ t.prototype.zn = function(t, e, n) {
        return this.Qn.Mn(t, e).next((function(t) {
            for (var r = 0, i = n; r < i.length; r++) {
                t = i[r].ot(e, t);
            }
            return t;
        }));
    }, 
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    t.prototype.Hn = function(t, e, n) {
        var r = Zt();
        return e.forEach((function(t, e) {
            for (var i = 0, o = n; i < o.length; i++) {
                e = o[i].ot(t, e);
            }
            r = r.Ae(t, e);
        })), r;
    }, 
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t.prototype.Yn = function(t, e) {
        var n = this;
        return this.Qn.getEntries(t, e).next((function(e) {
            return n.Jn(t, e);
        }));
    }, 
    /**
     * Similar to `getDocuments`, but creates the local view from the given
     * `baseDocs` without retrieving documents from the local store.
     */
    t.prototype.Jn = function(t, e) {
        var n = this;
        return this.Wn.Xn(t, e).next((function(r) {
            var i = n.Hn(t, e, r), o = $t();
            return i.forEach((function(t, e) {
                // TODO(http://b/32275378): Don't conflate missing / deleted.
                e || (e = new St(t, x.min())), o = o.Ae(t, e);
            })), o;
        }));
    }, 
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction The persistence transaction.
     * @param query The query to match documents against.
     * @param sinceReadTime If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */
    t.prototype.Zn = function(t, e, n) {
        return e.Ot() ? this.tr(t, e.path) : e._e() ? this.er(t, e, n) : this.sr(t, e, n);
    }, t.prototype.tr = function(t, e) {
        // Just do a simple document lookup.
        return this.Kn(t, new L(e)).next((function(t) {
            var e = te();
            return t instanceof kt && (e = e.Ae(t.key, t)), e;
        }));
    }, t.prototype.er = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = te();
        return this.jn.ir(t, i).next((function(s) {
            return Be.forEach(s, (function(s) {
                var u = e.Zt(s.child(i));
                return r.sr(t, u, n).next((function(t) {
                    t.forEach((function(t, e) {
                        o = o.Ae(t, e);
                    }));
                }));
            })).next((function() {
                return o;
            }));
        }));
    }, t.prototype.sr = function(t, e, n) {
        var r, i, o = this;
        // Query the remote documents and overlay mutations.
                return this.Qn.Zn(t, e, n).next((function(n) {
            return r = n, o.Wn.nr(t, e);
        })).next((function(e) {
            return i = e, o.rr(t, i, r).next((function(t) {
                r = t;
                for (var e = 0, n = i; e < n.length; e++) for (var o = n[e], s = 0, u = o.mutations; s < u.length; s++) {
                    var a = u[s], h = a.key, c = r.get(h), f = a.ot(c, c, o.Tn);
                    r = f instanceof kt ? r.Ae(h, f) : r.remove(h);
                }
            }));
        })).next((function() {
            // Finally, filter out any documents that don't actually match
            // the query.
            return r.forEach((function(t, n) {
                e.matches(n) || (r = r.remove(t));
            })), r;
        }));
    }, t.prototype.rr = function(t, e, n) {
        for (var r = ie(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
            var a = u[s];
            a instanceof gt && null === n.get(a.key) && (r = r.add(a.key));
        }
        var h = n;
        return this.Qn.getEntries(t, r).next((function(t) {
            return t.forEach((function(t, e) {
                null !== e && e instanceof kt && (h = h.Ae(t, e));
            })), h;
        }));
    }, t;
}(), Ke = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.hr = n, this.or = r;
    }
    return t.ar = function(e, n) {
        for (var r = ie(), i = ie(), o = 0, s = n.docChanges; o < s.length; o++) {
            var u = s[o];
            switch (u.type) {
              case 0 /* Added */ :
                r = r.add(u.doc.key);
                break;

              case 1 /* Removed */ :
                i = i.add(u.doc.key);
                // do nothing
                        }
        }
        return new t(e, n.fromCache, r, i);
    }, t;
}(), Ye = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.previousValue = t, e && (e.ur = function(t) {
            return n.cr(t);
        }, this._r = function(t) {
            return e.lr(t);
        });
    }
    return t.prototype.cr = function(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }, t.prototype.next = function() {
        var t = ++this.previousValue;
        return this._r && this._r(t), t;
    }, t;
}();

/** The default database name for a project. */
/** Represents the database ID a Firestore client is associated with. */ Ye.dr = -1;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var He = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, Xe = /** @class */ function() {
    function t(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , r
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i) {
        void 0 === n && (n = 1e3), void 0 === r && (r = 1.5), void 0 === i && (i = 6e4), 
        this.Tr = t, this.Er = e, this.Ir = n, this.wr = r, this.Rr = i, this.Ar = 0, this.mr = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.Pr = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    return t.prototype.reset = function() {
        this.Ar = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.Vr = function() {
        this.Ar = this.Rr;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.gr = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.Ar + this.pr()), r = Math.max(0, Date.now() - this.Pr), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && De("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.Ar + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
        this.mr = this.Tr.yr(this.Er, i, (function() {
            return e.Pr = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.Ar *= this.wr, this.Ar < this.Ir && (this.Ar = this.Ir), this.Ar > this.Rr && (this.Ar = this.Rr);
    }, t.prototype.cancel = function() {
        null !== this.mr && (this.mr.cancel(), this.mr = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype.pr = function() {
        return (Math.random() - .5) * this.Ar;
    }, t;
}(), $e = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.br = t, this.Er = e, this.vr = n, this.op = r, this.Sr = i, this.Dr = new He, 
        this.then = this.Dr.promise.then.bind(this.Dr.promise), this.catch = this.Dr.promise.catch.bind(this.Dr.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.Dr.promise.catch((function(t) {}))
        /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue The queue to schedule the operation on.
     * @param id A Timer ID identifying the type of operation this is.
     * @param delayMs The delay (ms) before the operation should be scheduled.
     * @param op The operation to run.
     * @param removalCallback A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */;
    }
    return t.Cr = function(e, n, r, i, o) {
        var s = new t(e, n, Date.now() + r, i, o);
        return s.start(r), s;
    }, 
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t.prototype.start = function(t) {
        var e = this;
        this.Fr = setTimeout((function() {
            return e.Nr();
        }), t);
    }, 
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t.prototype.kr = function() {
        return this.Nr();
    }, 
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t.prototype.cancel = function(t) {
        null !== this.Fr && (this.clearTimeout(), this.Dr.reject(new I(T.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }, t.prototype.Nr = function() {
        var t = this;
        this.br.$r((function() {
            return null !== t.Fr ? (t.clearTimeout(), t.op().then((function(e) {
                return t.Dr.resolve(e);
            }))) : Promise.resolve();
        }));
    }, t.prototype.clearTimeout = function() {
        null !== this.Fr && (this.Sr(this), clearTimeout(this.Fr), this.Fr = null);
    }, t;
}(), Ze = /** @class */ function() {
    function t() {
        var t = this;
        // The last promise in the queue.
                this.Mr = Promise.resolve(), 
        // The last retryable operation. Retryable operation are run in order and
        // retried with backoff.
        this.Lr = Promise.resolve(), 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.Or = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.xr = [], 
        // visible for testing
        this.Br = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.qr = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Ur = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Qr = new Xe(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Wr = function() {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            t.jr("async_queue_retry" /* AsyncQueueRetry */);
        };
        var e = Ie.nt().window;
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.Wr);
    }
    return Object.defineProperty(t.prototype, "Kr", {
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get: function() {
            return this.Or;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t.prototype.$r = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }, 
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue without waiting for it to complete (i.e. we ignore the Promise result).
     */
    t.prototype.Gr = function(t) {
        this.zr(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Hr(t);
    }, 
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue.
     */
    t.prototype.Yr = function(t) {
        return this.zr(), this.Hr(t);
    }, 
    /**
     * Adds a new operation to the queue and initialize the shut down of this queue.
     * Returns a promise that will be resolved when the promise returned by the new
     * operation is (with its value).
     * Once this method is called, the only possible way to request running an operation
     * is through `enqueueAndForgetEvenAfterShutdown`.
     */
    t.prototype.Jr = function(t) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.zr(), this.Or ? [ 3 /*break*/ , 2 ] : (this.Or = !0, (e = Ie.nt().window) && e.removeEventListener("visibilitychange", this.Wr), 
                    [ 4 /*yield*/ , this.Yr(t) ]);

                  case 1:
                    n.sent(), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Adds a new operation to the queue. Returns a promise that will be resolved
     * when the promise returned by the new operation is (with its value).
     */
    t.prototype.enqueue = function(t) {
        return this.zr(), this.Or ? new Promise((function(t) {})) : this.Hr(t);
    }, 
    /**
     * Enqueue a retryable operation.
     *
     * A retryable operation is rescheduled with backoff if it fails with a
     * IndexedDbTransactionError (the error type used by SimpleDb). All
     * retryable operations are executed in order and only run if all prior
     * operations were retried successfully.
     */
    t.prototype.Xr = function(t) {
        var r = this;
        this.zr(), this.Or || (this.Lr = this.Lr.then((function() {
            var i = new He, o = function() {
                return e(r, void 0, void 0, (function() {
                    var e;
                    return n(this, (function(n) {
                        switch (n.label) {
                          case 0:
                            return n.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , t() ];

                          case 1:
                            return n.sent(), i.resolve(), this.Qr.reset(), [ 3 /*break*/ , 3 ];

                          case 2:
                            if ("IndexedDbTransactionError" !== (e = n.sent()).name) throw i.resolve(), e;
                            // Failure will be handled by AsyncQueue
                                                        return De("AsyncQueue", "Operation failed with retryable error: " + e), 
                            this.Qr.gr(o), [ 3 /*break*/ , 3 ];

                          case 3:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            };
            return r.$r(o), i.promise;
        })));
    }, t.prototype.Hr = function(t) {
        var e = this, n = this.Mr.then((function() {
            return e.qr = !0, t().catch((function(t) {
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw e.Br = t, e.qr = !1, ke("INTERNAL UNHANDLED ERROR: ", t.stack || t.message || ""), 
                t;
            })).then((function(t) {
                return e.qr = !1, t;
            }));
        }));
        return this.Mr = n, n;
    }, 
    /**
     * Schedules an operation to be queued on the AsyncQueue once the specified
     * `delayMs` has elapsed. The returned CancelablePromise can be used to cancel
     * the operation prior to its running.
     */
    t.prototype.yr = function(t, e, n) {
        var r = this;
        this.zr(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Ur.indexOf(t) > -1 && (e = 0);
        var i = $e.Cr(this, t, e, n, (function(t) {
            return r.Zr(t);
        }));
        return this.xr.push(i), i;
    }, t.prototype.zr = function() {
        this.Br && xe();
    }, 
    /**
     * Verifies there's an operation currently in-progress on the AsyncQueue.
     * Unfortunately we can't verify that the running code is in the promise chain
     * of that operation, so this isn't a foolproof check, but it should be enough
     * to catch some bugs.
     */
    t.prototype.th = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.eh = function() {
        return e(this, void 0, void 0, (function() {
            var t;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , t = this.Mr ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    if (t !== this.Mr) return [ 3 /*break*/ , 0 ];
                    e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */
    t.prototype.sh = function(t) {
        for (var e = 0, n = this.xr; e < n.length; e++) {
            if (n[e].Er === t) return !0;
        }
        return !1;
    }, 
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId Delayed operations up to and including this TimerId will
     *  be drained. Throws if no such operation exists. Pass TimerId.All to run
     *  all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */
    t.prototype.jr = function(t) {
        var e = this;
        // Note that draining may generate more delayed ops, so we do that first.
                return this.eh().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.xr.sort((function(t, e) {
                return t.vr - e.vr;
            }));
            for (var n = 0, r = e.xr; n < r.length; n++) {
                var i = r[n];
                if (i.kr(), "all" /* All */ !== t && i.Er === t) break;
            }
            return e.eh();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.ih = function(t) {
        this.Ur.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.Zr = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.xr.indexOf(t);
        this.xr.splice(e, 1);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Je(t, e) {
    var n = t[0], r = t[1], i = e[0], o = e[1], s = Pe(n, i);
    return 0 === s ? Pe(r, o) : s;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ var tn = /** @class */ function() {
    function t(t) {
        this.nh = t, this.buffer = new Yt(Je), this.rh = 0;
    }
    return t.prototype.hh = function() {
        return ++this.rh;
    }, t.prototype.oh = function(t) {
        var e = [ t, this.hh() ];
        if (this.buffer.size < this.nh) this.buffer = this.buffer.add(e); else {
            var n = this.buffer.last();
            Je(e, n) < 0 && (this.buffer = this.buffer.delete(n).add(e));
        }
    }, Object.defineProperty(t.prototype, "maxValue", {
        get: function() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        },
        enumerable: !0,
        configurable: !0
    }), t;
}(), en = {
    ah: !1,
    uh: 0,
    _h: 0,
    lh: 0
}, nn = /** @class */ function() {
    function t(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.dh = t, this.fh = e, this.Th = n;
    }
    return t.Eh = function(e) {
        return new t(e, t.Ih, t.wh);
    }, t;
}();

nn.Rh = -1, nn.Ah = 1048576, nn.mh = 41943040, nn.Ih = 10, nn.wh = 1e3, nn.Ph = new nn(nn.mh, nn.Ih, nn.wh), 
nn.DISABLED = new nn(nn.Rh, 0, 0);

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */
var rn = /** @class */ function() {
    function t(t, e) {
        this.Vh = t, this.br = e, this.gh = !1, this.ph = null;
    }
    return t.prototype.start = function(t) {
        this.Vh.yh.dh !== nn.Rh && this.bh(t);
    }, t.prototype.stop = function() {
        this.ph && (this.ph.cancel(), this.ph = null);
    }, Object.defineProperty(t.prototype, "vh", {
        get: function() {
            return null !== this.ph;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.bh = function(t) {
        var r = this, i = this.gh ? 3e5 : 6e4;
        De("LruGarbageCollector", "Garbage collection scheduled in " + i + "ms"), this.ph = this.br.yr("lru_garbage_collection" /* LruGarbageCollection */ , i, (function() {
            return e(r, void 0, void 0, (function() {
                var e;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        this.ph = null, this.gh = !0, n.label = 1;

                      case 1:
                        return n.trys.push([ 1, 3, , 7 ]), [ 4 /*yield*/ , t.Sh(this.Vh) ];

                      case 2:
                        return n.sent(), [ 3 /*break*/ , 7 ];

                      case 3:
                        return "IndexedDbTransactionError" !== (e = n.sent()).name ? [ 3 /*break*/ , 4 ] : (De("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", e), 
                        [ 3 /*break*/ , 6 ]);

                      case 4:
                        return [ 4 /*yield*/ , pr(e) ];

                      case 5:
                        n.sent(), n.label = 6;

                      case 6:
                        return [ 3 /*break*/ , 7 ];

                      case 7:
                        return [ 4 /*yield*/ , this.bh(t) ];

                      case 8:
                        return n.sent(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, t;
}(), on = /** @class */ function() {
    function t(t, e) {
        this.Dh = t, this.yh = e
        /** Given a percentile of target to collect, returns the number of targets to collect. */;
    }
    return t.prototype.Ch = function(t, e) {
        return this.Dh.Fh(t).next((function(t) {
            return Math.floor(e / 100 * t);
        }));
    }, 
    /** Returns the nth sequence number, counting in order from the smallest. */ t.prototype.Nh = function(t, e) {
        var n = this;
        if (0 === e) return Be.resolve(Ye.dr);
        var r = new tn(e);
        return this.Dh.js(t, (function(t) {
            return r.oh(t.sequenceNumber);
        })).next((function() {
            return n.Dh.kh(t, (function(t) {
                return r.oh(t);
            }));
        })).next((function() {
            return r.maxValue;
        }));
    }, 
    /**
     * Removes targets with a sequence number equal to or less than the given upper bound, and removes
     * document associations with those targets.
     */
    t.prototype.$h = function(t, e, n) {
        return this.Dh.$h(t, e, n);
    }, 
    /**
     * Removes documents that have a sequence number equal to or less than the upper bound and are not
     * otherwise pinned.
     */
    t.prototype.Mh = function(t, e) {
        return this.Dh.Mh(t, e);
    }, t.prototype.Lh = function(t, e) {
        var n = this;
        return this.yh.dh === nn.Rh ? (De("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        Be.resolve(en)) : this.Oh(t).next((function(r) {
            return r < n.yh.dh ? (De("LruGarbageCollector", "Garbage collection skipped; Cache size " + r + " is lower than threshold " + n.yh.dh), 
            en) : n.xh(t, e);
        }));
    }, t.prototype.Oh = function(t) {
        return this.Dh.Oh(t);
    }, t.prototype.xh = function(t, e) {
        var n, r, i, o, u, a, h, c = this, f = Date.now();
        return this.Ch(t, this.yh.fh).next((function(e) {
            // Cap at the configured max
            return e > c.yh.Th ? (De("LruGarbageCollector", "Capping sequence numbers to collect down to the maximum of " + c.yh.Th + " from " + e), 
            r = c.yh.Th) : r = e, o = Date.now(), c.Nh(t, r);
        })).next((function(r) {
            return n = r, u = Date.now(), c.$h(t, n, e);
        })).next((function(e) {
            return i = e, a = Date.now(), c.Mh(t, n);
        })).next((function(t) {
            return h = Date.now(), Ae() <= s.DEBUG && De("LruGarbageCollector", "LRU Garbage Collection\n\tCounted targets in " + (o - f) + "ms\n\tDetermined least recently used " + r + " in " + (u - o) + "ms\n\tRemoved " + i + " targets in " + (a - u) + "ms\n\tRemoved " + t + " documents in " + (h - a) + "ms\nTotal Duration: " + (h - f) + "ms"), 
            Be.resolve({
                ah: !0,
                uh: r,
                _h: i,
                lh: t
            });
        }));
    }, t;
}();

/** Implements the steps for LRU garbage collection. */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */
function sn(t) {
    for (var e = "", n = 0; n < t.length; n++) e.length > 0 && (e = an(e)), e = un(t.get(n), e);
    return an(e);
}

/** Encodes a single segment of a resource path into the given result */ function un(t, e) {
    for (var n = e, r = t.length, i = 0; i < r; i++) {
        var o = t.charAt(i);
        switch (o) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += o;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function an(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function hn(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    var e = t.length;
    if (Ve(e >= 2), 2 === e) return Ve("" === t.charAt(0) && "" === t.charAt(1)), 
    R.G;
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        for (var n = e - 2, r = [], i = "", o = 0; o < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        var s = t.indexOf("", o);
        switch ((s < 0 || s > n) && xe(), t.charAt(s + 1)) {
          case "":
            var u = t.substring(o, s), a = void 0;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            a = u : (a = i += u, i = ""), r.push(a);
            break;

          case "":
            i += t.substring(o, s), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(o, s + 1);
            break;

          default:
            xe();
        }
        o = s + 2;
    }
    return new R(r);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// References to `window` are guarded by SimpleDb.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Provides a wrapper around IndexedDb with a simplified interface that uses
 * Promise-like return values to chain operations. Real promises cannot be used
 * since .then() continuations are executed asynchronously (e.g. via
 * .setImmediate), which would cause IndexedDB to end the transaction.
 * See PersistencePromise for more details.
 */ var cn = /** @class */ function() {
    function t(e) {
        this.db = e, 
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === t.Bh(u()) && ke("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")
        /**
     * Opens the specified database, creating or upgrading it if necessary.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support downgrading the schema
     * version. We currently do not support any way to do versioning outside of IndexedDB's versioning
     * mechanism, as only version-upgrade transactions are allowed to do things like create
     * objectstores.
     */;
    }
    return t.qh = function(e, n, r) {
        return De("SimpleDb", "Opening database:", e), new Be((function(i, o) {
            // TODO(mikelehen): Investigate browser compatibility.
            // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
            // suggests IE9 and older WebKit browsers handle upgrade
            // differently. They expect setVersion, as described here:
            // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
            var s = window.indexedDB.open(e, n);
            s.onsuccess = function(e) {
                var n = e.target.result;
                i(new t(n));
            }, s.onblocked = function() {
                o(new I(T.FAILED_PRECONDITION, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
            }, s.onerror = function(t) {
                var e = t.target.error;
                "VersionError" === e.name ? o(new I(T.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : o(e);
            }, s.onupgradeneeded = function(t) {
                De("SimpleDb", 'Database "' + e + '" requires upgrade from version:', t.oldVersion);
                var n = t.target.result;
                r.createOrUpgrade(n, s.transaction, t.oldVersion, qn).next((function() {
                    De("SimpleDb", "Database upgrade to version " + qn + " complete");
                }));
            };
        })).yn();
    }, 
    /** Deletes the specified database. */ t.delete = function(t) {
        return De("SimpleDb", "Removing database:", t), yn(window.indexedDB.deleteDatabase(t)).yn();
    }, 
    /** Returns true if IndexedDB is available in the current environment. */ t.Uh = function() {
        if ("undefined" == typeof window || null == window.indexedDB) return !1;
        if (t.Qh()) return !0;
        // In some Node environments, `window` is defined, but `window.navigator` is
        // not. We don't support IndexedDB persistence in Node if the
        // isMockPersistence() check above returns false.
                if (void 0 === window.navigator) return !1;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                var e = u(), n = t.Bh(e), r = 0 < n && n < 10, i = t.Wh(e), o = 0 < i && i < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(e.indexOf("MSIE ") > 0 || e.indexOf("Trident/") > 0 || e.indexOf("Edge/") > 0 || r || o);
    }, 
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    t.Qh = function() {
        var t;
        return "undefined" != typeof __PRIVATE_process && "YES" === (null === (t = __PRIVATE_process.__PRIVATE_env) || void 0 === t ? void 0 : t.jh);
    }, 
    /** Helper to get a typed SimpleDbStore from a transaction. */ t.Kh = function(t, e) {
        return t.store(e);
    }, 
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    t.Bh = function(t) {
        var e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, 
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    t.Wh = function(t) {
        var e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }, t.prototype.Gh = function(t) {
        this.db.onversionchange = function(e) {
            return t(e);
        };
    }, t.prototype.runTransaction = function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e, o, s, u, a;
            return n(this, (function(h) {
                switch (h.label) {
                  case 0:
                    e = "readonly" === t, o = 0, s = function() {
                        var t, s, a, h, c;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                ++o, t = pn.open(u.db, e ? "readonly" : "readwrite", r), n.label = 1;

                              case 1:
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                return n.trys.push([ 1, 3, , 4 ]), s = i(t).catch((function(e) {
                                    // Abort the transaction if there was an error.
                                    return t.abort(e), Be.reject(e);
                                })).yn(), a = {}, s.catch((function() {})), [ 4 /*yield*/ , t.zh ];

                              case 2:
                                return [ 2 /*return*/ , (a.value = (
                                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                                // fire), but still return the original transactionFnResult back to the
                                // caller.
                                n.sent(), s), a) ];

                              case 3:
                                return h = n.sent(), c = "FirebaseError" !== h.name && o < 3, De("SimpleDb", "Transaction failed with error: %s. Retrying: %s.", h.message, c), 
                                c ? [ 3 /*break*/ , 4 ] : [ 2 /*return*/ , {
                                    value: Promise.reject(h)
                                } ];

                              case 4:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, u = this, h.label = 1;

                  case 1:
                    return [ 5 /*yield**/ , s() ];

                  case 2:
                    if ("object" == typeof (a = h.sent())) return [ 2 /*return*/ , a.value ];
                    h.label = 3;

                  case 3:
                    return [ 3 /*break*/ , 1 ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.close = function() {
        this.db.close();
    }, t;
}(), fn = /** @class */ function() {
    function t(t) {
        this.Hh = t, this.Yh = !1, this.Jh = null;
    }
    return Object.defineProperty(t.prototype, "Pn", {
        get: function() {
            return this.Yh;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Xh", {
        get: function() {
            return this.Jh;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "cursor", {
        set: function(t) {
            this.Hh = t;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * This function can be called to stop iteration at any point.
     */
    t.prototype.done = function() {
        this.Yh = !0;
    }, 
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    t.prototype.Zh = function(t) {
        this.Jh = t;
    }, 
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    t.prototype.delete = function() {
        return yn(this.Hh.delete());
    }, t;
}(), ln = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, T.UNAVAILABLE, "IndexedDB transaction failed: " + t) || this).name = "IndexedDbTransactionError", 
        n;
    }
    return t(n, e), n;
}(I), pn = /** @class */ function() {
    function t(t) {
        var e = this;
        this.transaction = t, this.aborted = !1, 
        /**
             * A promise that resolves with the result of the IndexedDb transaction.
             */
        this.to = new He, this.transaction.oncomplete = function() {
            e.to.resolve();
        }, this.transaction.onabort = function() {
            t.error ? e.to.reject(new ln(t.error)) : e.to.resolve();
        }, this.transaction.onerror = function(t) {
            var n = mn(t.target.error);
            e.to.reject(new ln(n));
        };
    }
    return t.open = function(e, n, r) {
        return new t(e.transaction(r, n));
    }, Object.defineProperty(t.prototype, "zh", {
        get: function() {
            return this.to.promise;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.abort = function(t) {
        t && this.to.reject(t), this.aborted || (De("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }, 
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    t.prototype.store = function(t) {
        var e = this.transaction.objectStore(t);
        return new dn(e);
    }, t;
}(), dn = /** @class */ function() {
    function t(t) {
        this.store = t;
    }
    return t.prototype.put = function(t, e) {
        var n;
        return void 0 !== e ? (De("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (De("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), yn(n);
    }, 
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value The object to write.
     * @return The key of the value to add.
     */
    t.prototype.add = function(t) {
        return De("SimpleDb", "ADD", this.store.name, t, t), yn(this.store.add(t));
    }, 
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @return The object with the specified key or null if no object exists.
     */
    t.prototype.get = function(t) {
        var e = this;
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return yn(this.store.get(t)).next((function(n) {
            // Normalize nonexistence to null.
            return void 0 === n && (n = null), De("SimpleDb", "GET", e.store.name, t, n), n;
        }));
    }, t.prototype.delete = function(t) {
        return De("SimpleDb", "DELETE", this.store.name, t), yn(this.store.delete(t));
    }, 
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    t.prototype.count = function() {
        return De("SimpleDb", "COUNT", this.store.name), yn(this.store.count());
    }, t.prototype.eo = function(t, e) {
        var n = this.cursor(this.options(t, e)), r = [];
        return this.so(n, (function(t, e) {
            r.push(e);
        })).next((function() {
            return r;
        }));
    }, t.prototype.io = function(t, e) {
        De("SimpleDb", "DELETE ALL", this.store.name);
        var n = this.options(t, e);
        n.no = !1;
        var r = this.cursor(n);
        return this.so(r, (function(t, e, n) {
            return n.delete();
        }));
    }, t.prototype.ro = function(t, e) {
        var n;
        e ? n = t : (n = {}, e = t);
        var r = this.cursor(n);
        return this.so(r, e);
    }, 
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    t.prototype.ho = function(t) {
        var e = this.cursor({});
        return new Be((function(n, r) {
            e.onerror = function(t) {
                var e = mn(t.target.error);
                r(e);
            }, e.onsuccess = function(e) {
                var r = e.target.result;
                r ? t(r.primaryKey, r.value).next((function(t) {
                    t ? r.continue() : n();
                })) : n();
            };
        }));
    }, t.prototype.so = function(t, e) {
        var n = [];
        return new Be((function(r, i) {
            t.onerror = function(t) {
                i(t.target.error);
            }, t.onsuccess = function(t) {
                var i = t.target.result;
                if (i) {
                    var o = new fn(i), s = e(i.primaryKey, i.value, o);
                    if (s instanceof Be) {
                        var u = s.catch((function(t) {
                            return o.done(), Be.reject(t);
                        }));
                        n.push(u);
                    }
                    o.Pn ? r() : null === o.Xh ? i.continue() : i.continue(o.Xh);
                } else r();
            };
        })).next((function() {
            return Be.vn(n);
        }));
    }, t.prototype.options = function(t, e) {
        var n = void 0;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }, t.prototype.cursor = function(t) {
        var e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            var n = this.store.index(t.index);
            return t.no ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }, t;
}();

/**
 * A controller for iterating over a key range or index. It allows an iterate
 * callback to delete the currently-referenced object, or jump to a new key
 * within the key range or index.
 */
/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */
function yn(t) {
    return new Be((function(e, n) {
        t.onsuccess = function(t) {
            var n = t.target.result;
            e(n);
        }, t.onerror = function(t) {
            var e = mn(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
var vn = !1;

function mn(t) {
    var e = cn.Bh(u());
    if (e >= 12.2 && e < 13) {
        var n = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(n) >= 0) {
            // Wrap error in a more descriptive one.
            var r = new I("internal", "IOS_INDEXEDDB_BUG1: IndexedDb has thrown '" + n + "'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
            return vn || (vn = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((function() {
                throw r;
            }), 0)), r;
        }
    }
    return t;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** A mutation queue for a specific user, backed by IndexedDB. */ var gn = /** @class */ function() {
    function t(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, r) {
        this.userId = t, this.serializer = e, this.jn = n, this.oo = r, 
        /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
        // PORTING NOTE: Multi-tab only.
        this.ao = {}
        /**
     * Creates a new mutation queue for the given user.
     * @param user The user for which to create a mutation queue.
     * @param serializer The serializer to use when persisting to IndexedDb.
     */;
    }
    return t.uo = function(e, n, r, i) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        return Ve("" !== e.uid), new t(e.t() ? e.uid : "", n, r, i);
    }, t.prototype.co = function(t) {
        var e = !0, n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return bn(t).ro({
            index: Bn.userMutationsIndex,
            range: n
        }, (function(t, n, r) {
            e = !1, r.done();
        })).next((function() {
            return e;
        }));
    }, t.prototype._o = function(t, e, n) {
        return this.lo(t).next((function(e) {
            // We can't store the resumeToken as a ByteString in IndexedDB, so we
            // convert it to a Base64 string for storage.
            return e.lastStreamToken = n.toBase64(), In(t).put(e);
        }));
    }, t.prototype.do = function(t) {
        return this.lo(t).next((function(t) {
            return C.fromBase64String(t.lastStreamToken);
        }));
    }, t.prototype.fo = function(t, e) {
        return this.lo(t).next((function(n) {
            // We can't store the resumeToken as a ByteString in IndexedDB, so we
            // convert it to a Base64 string for storage.
            return n.lastStreamToken = e.toBase64(), In(t).put(n);
        }));
    }, t.prototype.To = function(t, e, n, r) {
        var i = this, o = Tn(t), s = bn(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s.add({}).next((function(u) {
            Ve("number" == typeof u);
            for (var a = new Fe(u, e, n, r), h = i.serializer.Eo(i.userId, a), c = [], f = new Yt((function(t, e) {
                return Pe(t.j(), e.j());
            })), l = 0, p = r; l < p.length; l++) {
                var d = p[l], y = Gn.key(i.userId, d.key.path, u);
                f = f.add(d.key.path.M()), c.push(s.put(h)), c.push(o.put(y, Gn.PLACEHOLDER));
            }
            return f.forEach((function(e) {
                c.push(i.jn.Io(t, e));
            })), t.qn((function() {
                i.ao[u] = a.keys();
            })), Be.vn(c).next((function() {
                return a;
            }));
        }));
    }, t.prototype.wo = function(t, e) {
        var n = this;
        return bn(t).get(e).next((function(t) {
            return t ? (Ve(t.userId === n.userId), n.serializer.Ro(t)) : null;
        }));
    }, 
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Ao = function(t, e) {
        var n = this;
        return this.ao[e] ? Be.resolve(this.ao[e]) : this.wo(t, e).next((function(t) {
            if (t) {
                var r = t.keys();
                return n.ao[e] = r, r;
            }
            return null;
        }));
    }, t.prototype.mo = function(t, e) {
        var n = this, r = e + 1, i = IDBKeyRange.lowerBound([ this.userId, r ]), o = null;
        return bn(t).ro({
            index: Bn.userMutationsIndex,
            range: i
        }, (function(t, e, i) {
            e.userId === n.userId && (Ve(e.batchId >= r), o = n.serializer.Ro(e)), i.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.Po = function(t) {
        var e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]), n = -1;
        return bn(t).ro({
            index: Bn.userMutationsIndex,
            range: e,
            reverse: !0
        }, (function(t, e, r) {
            n = e.batchId, r.done();
        })).next((function() {
            return n;
        }));
    }, t.prototype.Vo = function(t) {
        var e = this, n = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return bn(t).eo(Bn.userMutationsIndex, n).next((function(t) {
            return t.map((function(t) {
                return e.serializer.Ro(t);
            }));
        }));
    }, t.prototype.Gn = function(t, e) {
        var n = this, r = Gn.prefixForPath(this.userId, e.path), i = IDBKeyRange.lowerBound(r), o = [];
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
                return Tn(t).ro({
            range: i
        }, (function(r, i, s) {
            var u = r[0], a = r[1], h = r[2], c = hn(a);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (u === n.userId && e.path.isEqual(c)) 
            // Look up the mutation batch in the store.
            return bn(t).get(h).next((function(t) {
                if (!t) throw xe();
                Ve(t.userId === n.userId), o.push(n.serializer.Ro(t));
            }));
            s.done();
        })).next((function() {
            return o;
        }));
    }, t.prototype.Xn = function(t, e) {
        var n = this, r = new Yt(Pe), i = [];
        return e.forEach((function(e) {
            var o = Gn.prefixForPath(n.userId, e.path), s = IDBKeyRange.lowerBound(o), u = Tn(t).ro({
                range: s
            }, (function(t, i, o) {
                var s = t[0], u = t[1], a = t[2], h = hn(u);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                s === n.userId && e.path.isEqual(h) ? r = r.add(a) : o.done();
            }));
            i.push(u);
        })), Be.vn(i).next((function() {
            return n.po(t, r);
        }));
    }, t.prototype.nr = function(t, e) {
        var n = this, r = e.path, i = r.length + 1, o = Gn.prefixForPath(this.userId, r), s = IDBKeyRange.lowerBound(o), u = new Yt(Pe);
        return Tn(t).ro({
            range: s
        }, (function(t, e, o) {
            var s = t[0], a = t[1], h = t[2], c = hn(a);
            s === n.userId && r.q(c) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            c.length === i && (u = u.add(h)) : o.done();
        })).next((function() {
            return n.po(t, u);
        }));
    }, t.prototype.po = function(t, e) {
        var n = this, r = [], i = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((function(e) {
            i.push(bn(t).get(e).next((function(t) {
                if (null === t) throw xe();
                Ve(t.userId === n.userId), r.push(n.serializer.Ro(t));
            })));
        })), Be.vn(i).next((function() {
            return r;
        }));
    }, t.prototype.yo = function(t, e) {
        var n = this;
        return En(t.bo, this.userId, e).next((function(r) {
            return t.qn((function() {
                n.vo(e.batchId);
            })), Be.forEach(r, (function(e) {
                return n.oo.So(t, e);
            }));
        }));
    }, 
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    t.prototype.vo = function(t) {
        delete this.ao[t];
    }, t.prototype.Do = function(t) {
        var e = this;
        return this.co(t).next((function(n) {
            if (!n) return Be.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        var r = IDBKeyRange.lowerBound(Gn.prefixForUser(e.userId)), i = [];
            return Tn(t).ro({
                range: r
            }, (function(t, n, r) {
                if (t[0] === e.userId) {
                    var o = hn(t[1]);
                    i.push(o);
                } else r.done();
            })).next((function() {
                Ve(0 === i.length);
            }));
        }));
    }, t.prototype.Co = function(t, e) {
        return wn(t, this.userId, e);
    }, 
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    t.prototype.lo = function(t) {
        var e = this;
        return In(t).get(this.userId).next((function(t) {
            return t || new jn(e.userId, -1, 
            /*lastStreamToken=*/ "");
        }));
    }, t;
}();

/**
 * @return true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function wn(t, e, n) {
    var r = Gn.prefixForPath(e, n.path), i = r[1], o = IDBKeyRange.lowerBound(r), s = !1;
    return Tn(t).ro({
        range: o,
        no: !0
    }, (function(t, n, r) {
        var o = t[0], u = t[1];
        t[2];
        o === e && u === i && (s = !0), r.done();
    })).next((function() {
        return s;
    }));
}

/** Returns true if any mutation queue contains the given document. */
/**
 * Delete a mutation batch and the associated document mutations.
 * @return A PersistencePromise of the document mutations that were removed.
 */ function En(t, e, n) {
    var r = t.store(Bn.store), i = t.store(Gn.store), o = [], s = IDBKeyRange.only(n.batchId), u = 0, a = r.ro({
        range: s
    }, (function(t, e, n) {
        return u++, n.delete();
    }));
    o.push(a.next((function() {
        Ve(1 === u);
    })));
    for (var h = [], c = 0, f = n.mutations; c < f.length; c++) {
        var l = f[c], p = Gn.key(e, l.key.path, n.batchId);
        o.push(i.delete(p)), h.push(l.key);
    }
    return Be.vn(o).next((function() {
        return h;
    }));
}

/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */ function bn(t) {
    return sr.Kh(t, Bn.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function Tn(t) {
    return sr.Kh(t, Gn.store);
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function In(t) {
    return sr.Kh(t, jn.store);
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Offset to ensure non-overlapping target ids. */
/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */ var Nn = /** @class */ function() {
    function t(t) {
        this.Fo = t;
    }
    return t.prototype.next = function() {
        return this.Fo += 2, this.Fo;
    }, t.No = function() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new t(0);
    }, t.ko = function() {
        // Sync engine assigns target IDs for limbo document detection.
        return new t(-1);
    }, t;
}(), An = /** @class */ function() {
    function t(t, e) {
        this.oo = t, this.serializer = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
        return t.prototype.$o = function(t) {
        var e = this;
        return this.Mo(t).next((function(n) {
            var r = new Nn(n.highestTargetId);
            return n.highestTargetId = r.next(), e.Lo(t, n).next((function() {
                return n.highestTargetId;
            }));
        }));
    }, t.prototype.Oo = function(t) {
        return this.Mo(t).next((function(t) {
            return x.v(new S(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds));
        }));
    }, t.prototype.xo = function(t) {
        return kn(t.bo);
    }, t.prototype.Bo = function(t, e, n) {
        var r = this;
        return this.Mo(t).next((function(i) {
            return i.highestListenSequenceNumber = e, n && (i.lastRemoteSnapshotVersion = n.C()), 
            e > i.highestListenSequenceNumber && (i.highestListenSequenceNumber = e), r.Lo(t, i);
        }));
    }, t.prototype.qo = function(t, e) {
        var n = this;
        return this.Uo(t, e).next((function() {
            return n.Mo(t).next((function(r) {
                return r.targetCount += 1, n.Qo(e, r), n.Lo(t, r);
            }));
        }));
    }, t.prototype.Wo = function(t, e) {
        return this.Uo(t, e);
    }, t.prototype.jo = function(t, e) {
        var n = this;
        return this.Ko(t, e.targetId).next((function() {
            return _n(t).delete(e.targetId);
        })).next((function() {
            return n.Mo(t);
        })).next((function(e) {
            return Ve(e.targetCount > 0), e.targetCount -= 1, n.Lo(t, e);
        }));
    }, 
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */
    t.prototype.$h = function(t, e, n) {
        var r = this, i = 0, o = [];
        return _n(t).ro((function(s, u) {
            var a = r.serializer.Go(u);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (i++, o.push(r.jo(t, a)));
        })).next((function() {
            return Be.vn(o);
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Call provided function with each `TargetData` that we have cached.
     */
    t.prototype.js = function(t, e) {
        var n = this;
        return _n(t).ro((function(t, r) {
            var i = n.serializer.Go(r);
            e(i);
        }));
    }, t.prototype.Mo = function(t) {
        return Dn(t.bo);
    }, t.prototype.Lo = function(t, e) {
        return (n = t, sr.Kh(n, Xn.store)).put(Xn.key, e);
        /**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */        var n;
    }, t.prototype.Uo = function(t, e) {
        return _n(t).put(this.serializer.zo(e));
    }, 
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */
    t.prototype.Qo = function(t, e) {
        var n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }, t.prototype.Ho = function(t) {
        return this.Mo(t).next((function(t) {
            return t.targetCount;
        }));
    }, t.prototype.Yo = function(t, e) {
        var n = this, r = e.canonicalId(), i = IDBKeyRange.bound([ r, Number.NEGATIVE_INFINITY ], [ r, Number.POSITIVE_INFINITY ]), o = null;
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
                return _n(t).ro({
            range: i,
            index: Yn.queryTargetsIndexName
        }, (function(t, r, i) {
            var s = n.serializer.Go(r);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        e.isEqual(s.target) && (o = s, i.done());
        })).next((function() {
            return o;
        }));
    }, t.prototype.Jo = function(t, e, n) {
        var r = this, i = [], o = Sn(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return e.forEach((function(e) {
            var s = sn(e.path);
            i.push(o.put(new Hn(n, s))), i.push(r.oo.Xo(t, n, e));
        })), Be.vn(i);
    }, t.prototype.Zo = function(t, e, n) {
        var r = this, i = Sn(t);
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
                return Be.forEach(e, (function(e) {
            var o = sn(e.path);
            return Be.vn([ i.delete([ n, o ]), r.oo.ta(t, n, e) ]);
        }));
    }, t.prototype.Ko = function(t, e) {
        var n = Sn(t), r = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(r);
    }, t.prototype.ea = function(t, e) {
        var n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), r = Sn(t), i = ie();
        return r.ro({
            range: n,
            no: !0
        }, (function(t, e, n) {
            var r = hn(t[1]), o = new L(r);
            i = i.add(o);
        })).next((function() {
            return i;
        }));
    }, t.prototype.Co = function(t, e) {
        var n = sn(e.path), r = IDBKeyRange.bound([ n ], [ Ue(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), i = 0;
        return Sn(t).ro({
            index: Hn.documentTargetsIndex,
            no: !0,
            range: r
        }, (function(t, e, n) {
            var r = t[0];
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
                        t[1];
            0 !== r && (i++, n.done());
        })).next((function() {
            return i > 0;
        }));
    }, 
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId The target ID of the TargetData entry to look up.
     * @return The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.si = function(t, e) {
        var n = this;
        return _n(t).get(e).next((function(t) {
            return t ? n.serializer.Go(t) : null;
        }));
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */
function _n(t) {
    return sr.Kh(t, Yn.store);
}

function Dn(t) {
    return cn.Kh(t, Xn.store).get(Xn.key).next((function(t) {
        return Ve(null !== t), t;
    }));
}

function kn(t) {
    return Dn(t).next((function(t) {
        return t.highestListenSequenceNumber;
    }));
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function Sn(t) {
    return sr.Kh(t, Hn.store);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var xn = /** @class */ function() {
    /**
     * @param {LocalSerializer} serializer The document serializer.
     * @param {IndexManager} indexManager The query indexes that need to be maintained.
     */
    function t(t, e) {
        this.serializer = t, this.jn = e
        /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */;
    }
    return t.prototype.Nn = function(t, e, n) {
        return Rn(t).put(On(e), n);
    }, 
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */
    t.prototype.$n = function(t, e) {
        var n = Rn(t), r = On(e);
        return n.delete(r);
    }, 
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */
    t.prototype.updateMetadata = function(t, e) {
        var n = this;
        return this.getMetadata(t).next((function(r) {
            return r.byteSize += e, n.sa(t, r);
        }));
    }, t.prototype.Mn = function(t, e) {
        var n = this;
        return Rn(t).get(On(e)).next((function(t) {
            return n.ia(t);
        }));
    }, 
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey The key of the entry to look up.
     * @return The cached MaybeDocument entry and its size, or null if we have nothing cached.
     */
    t.prototype.na = function(t, e) {
        var n = this;
        return Rn(t).get(On(e)).next((function(t) {
            var e = n.ia(t);
            return e ? {
                ra: e,
                size: Pn(t)
            } : null;
        }));
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Zt();
        return this.ha(t, e, (function(t, e) {
            var i = n.ia(e);
            r = r.Ae(t, i);
        })).next((function() {
            return r;
        }));
    }, 
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys The set of keys entries to look up.
     * @return A map of MaybeDocuments indexed by key (if a document cannot be
     *     found, the key will be mapped to null) and a map of sizes indexed by
     *     key (zero if the key cannot be found).
     */
    t.prototype.oa = function(t, e) {
        var n = this, r = Zt(), i = new Qt(L.N);
        return this.ha(t, e, (function(t, e) {
            var o = n.ia(e);
            o ? (r = r.Ae(t, o), i = i.Ae(t, Pn(e))) : (r = r.Ae(t, null), i = i.Ae(t, 0));
        })).next((function() {
            return {
                aa: r,
                ua: i
            };
        }));
    }, t.prototype.ha = function(t, e, n) {
        if (e.B()) return Be.resolve();
        var r = IDBKeyRange.bound(e.first().path.W(), e.last().path.W()), i = e.be(), o = i.Ne();
        return Rn(t).ro({
            range: r
        }, (function(t, e, r) {
            // Go through keys not found in cache.
            for (var s = L.st(t); o && L.N(o, s) < 0; ) n(o, null), o = i.Ne();
            o && o.isEqual(s) && (
            // Key found in cache.
            n(o, e), o = i.ke() ? i.Ne() : null), 
            // Skip to the next key (if there is one).
            o ? r.Zh(o.path.W()) : r.done();
        })).next((function() {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;o; ) n(o, null), o = i.ke() ? i.Ne() : null;
        }));
    }, t.prototype.Zn = function(t, e, n) {
        var r = this, i = te(), o = e.path.length + 1, s = {};
        if (n.isEqual(x.min())) {
            // Documents are ordered by key, so we can use a prefix scan to narrow
            // down the documents we need to match the query against.
            var u = e.path.W();
            s.range = IDBKeyRange.lowerBound(u);
        } else {
            // Execute an index-free query and filter by read time. This is safe
            // since all document changes to queries that have a
            // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
            var a = e.path.W(), h = this.serializer.ca(n);
            s.range = IDBKeyRange.lowerBound([ a, h ], 
            /* open= */ !0), s.index = Wn.collectionReadTimeIndex;
        }
        return Rn(t).ro(s, (function(t, n, s) {
            // The query is actually returning any path that starts with the query
            // path prefix which may include documents in subcollections. For
            // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
            // shouldn't match it. Fix this by discarding rows with document keys
            // more than one segment longer than the query path.
            if (t.length === o) {
                var u = r.serializer._a(n);
                e.path.q(u.key.path) ? u instanceof kt && e.matches(u) && (i = i.Ae(u.key, u)) : s.done();
            }
        })).next((function() {
            return i;
        }));
    }, 
    /**
     * Returns the set of documents that have changed since the specified read
     * time.
     */
    // PORTING NOTE: This is only used for multi-tab synchronization.
    t.prototype.la = function(t, e) {
        var n = this, r = $t(), i = this.serializer.ca(e), o = Rn(t), s = IDBKeyRange.lowerBound(i, !0);
        return o.ro({
            index: Wn.readTimeIndex,
            range: s
        }, (function(t, e) {
            // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
            // the documents directly since we want to keep sentinel deletes.
            var o = n.serializer._a(e);
            r = r.Ae(o.key, o), i = e.readTime;
        })).next((function() {
            return {
                da: r,
                readTime: n.serializer.fa(i)
            };
        }));
    }, 
    /**
     * Returns the read time of the most recently read document in the cache, or
     * SnapshotVersion.min() if not available.
     */
    // PORTING NOTE: This is only used for multi-tab synchronization.
    t.prototype.Ta = function(t) {
        var e = this, n = Rn(t), r = x.min();
        return n.ro({
            index: Wn.readTimeIndex,
            reverse: !0
        }, (function(t, n, i) {
            n.readTime && (r = e.serializer.fa(n.readTime)), i.done();
        })).next((function() {
            return r;
        }));
    }, t.prototype.Ea = function(e) {
        return new t.Ia(this, !!e && e.wa);
    }, t.prototype.Ra = function(t) {
        return this.getMetadata(t).next((function(t) {
            return t.byteSize;
        }));
    }, t.prototype.getMetadata = function(t) {
        return Vn(t).get(Kn.key).next((function(t) {
            return Ve(!!t), t;
        }));
    }, t.prototype.sa = function(t, e) {
        return Vn(t).put(Kn.key, e);
    }, 
    /**
     * Decodes `remoteDoc` and returns the document (or null, if the document
     * corresponds to the format used for sentinel deletes).
     */
    t.prototype.ia = function(t) {
        if (t) {
            var e = this.serializer._a(t);
            return e instanceof St && e.version.isEqual(x.min()) ? null : e;
        }
        return null;
    }, t;
}();

/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */ function Vn(t) {
    return sr.Kh(t, Kn.store);
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function Rn(t) {
    return sr.Kh(t, Wn.store);
}

function On(t) {
    return t.path.W();
}

/**
 * Retrusn an approximate size for the given document.
 */ function Pn(t) {
    var e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw xe();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An in-memory implementation of IndexManager.
 */ xn.Ia = /** @class */ function(e) {
    /**
     * @param documentCache The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).Aa = t, r.wa = n, 
        // A map of document sizes prior to applying the changes in this buffer.
        r.ma = new Ce((function(t) {
            return t.toString();
        })), r;
    }
    return t(n, e), n.prototype.xn = function(t) {
        var e = this, n = [], r = 0, i = new Yt((function(t, e) {
            return Pe(t.j(), e.j());
        }));
        return this.Dn.forEach((function(o, s) {
            var u = e.ma.get(o);
            if (s) {
                var a = e.Aa.serializer.Pa(s, e.readTime);
                i = i.add(o.path.M());
                var h = Pn(a);
                r += h - u, n.push(e.Aa.Nn(t, o, a));
            } else if (r -= u, e.wa) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                var c = e.Aa.serializer.Pa(new St(o, x.min()), e.readTime);
                n.push(e.Aa.Nn(t, o, c));
            } else n.push(e.Aa.$n(t, o));
        })), i.forEach((function(r) {
            n.push(e.Aa.jn.Io(t, r));
        })), n.push(this.Aa.updateMetadata(t, r)), Be.vn(n);
    }, n.prototype.Ln = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute a delta later.
                return this.Aa.na(t, e).next((function(t) {
            return null === t ? (n.ma.set(e, 0), null) : (n.ma.set(e, t.size), t.ra);
        }));
    }, n.prototype.On = function(t, e) {
        var n = this;
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
                return this.Aa.oa(t, e).next((function(t) {
            var e = t.aa;
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `NullableMaybeDocumentMap` directly, without a conversion.
            return t.ua.forEach((function(t, e) {
                n.ma.set(t, e);
            })), e;
        }));
    }, n;
}(Ge);

var Ln = /** @class */ function() {
    function t() {
        this.Va = new Un;
    }
    return t.prototype.Io = function(t, e) {
        return this.Va.add(e), Be.resolve();
    }, t.prototype.ir = function(t, e) {
        return Be.resolve(this.Va.getEntries(e));
    }, t;
}(), Un = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.O(), n = t.M(), r = this.index[e] || new Yt(R.N), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.O(), n = t.M(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new Yt(R.N)).W();
    }, t;
}(), qn = 10, Mn = /** @class */ function() {
    function t(t) {
        this.serializer = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    return t.prototype.createOrUpgrade = function(t, e, n, r) {
        var i = this;
        Ve(n < r && n >= 0 && r <= qn);
        var o = new pn(e);
        n < 1 && r >= 1 && (function(t) {
            t.createObjectStore(Fn.store);
        }(t), function(t) {
            t.createObjectStore(jn.store, {
                keyPath: jn.keyPath
            }), t.createObjectStore(Bn.store, {
                keyPath: Bn.keyPath,
                autoIncrement: !0
            }).createIndex(Bn.userMutationsIndex, Bn.userMutationsKeyPath, {
                unique: !0
            }), t.createObjectStore(Gn.store);
        }(t), Zn(t), function(t) {
            t.createObjectStore(Wn.store);
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
        var s = Be.resolve();
        return n < 3 && r >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (function(t) {
            t.deleteObjectStore(Hn.store), t.deleteObjectStore(Yn.store), t.deleteObjectStore(Xn.store);
        }(t), Zn(t)), s = s.next((function() {
            /**
     * Creates the target global singleton row.
     *
     * @param {IDBTransaction} txn The version upgrade transaction for indexeddb
     */
            return function(t) {
                var e = t.store(Xn.store), n = new Xn(
                /*highestTargetId=*/ 0, 
                /*lastListenSequenceNumber=*/ 0, x.min().C(), 
                /*targetCount=*/ 0);
                return e.put(Xn.key, n);
            }(o);
        }))), n < 4 && r >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        s = s.next((function() {
            return function(t, e) {
                return e.store(Bn.store).eo().next((function(n) {
                    t.deleteObjectStore(Bn.store), t.createObjectStore(Bn.store, {
                        keyPath: Bn.keyPath,
                        autoIncrement: !0
                    }).createIndex(Bn.userMutationsIndex, Bn.userMutationsKeyPath, {
                        unique: !0
                    });
                    var r = e.store(Bn.store), i = n.map((function(t) {
                        return r.put(t);
                    }));
                    return Be.vn(i);
                }));
            }(t, o);
        }))), s = s.next((function() {
            !function(t) {
                t.createObjectStore(Jn.store, {
                    keyPath: Jn.keyPath
                });
            }(t);
        }))), n < 5 && r >= 5 && (s = s.next((function() {
            return i.removeAcknowledgedMutations(o);
        }))), n < 6 && r >= 6 && (s = s.next((function() {
            return function(t) {
                t.createObjectStore(Kn.store);
            }(t), i.addDocumentGlobal(o);
        }))), n < 7 && r >= 7 && (s = s.next((function() {
            return i.ensureSequenceNumbers(o);
        }))), n < 8 && r >= 8 && (s = s.next((function() {
            return i.createCollectionParentIndex(t, o);
        }))), n < 9 && r >= 9 && (s = s.next((function() {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t), function(t) {
                var e = t.objectStore(Wn.store);
                e.createIndex(Wn.readTimeIndex, Wn.readTimeIndexPath, {
                    unique: !1
                }), e.createIndex(Wn.collectionReadTimeIndex, Wn.collectionReadTimeIndexPath, {
                    unique: !1
                });
            }(e);
        }))), n < 10 && r >= 10 && (s = s.next((function() {
            return i.rewriteCanonicalIds(o);
        }))), s;
    }, t.prototype.addDocumentGlobal = function(t) {
        var e = 0;
        return t.store(Wn.store).ro((function(t, n) {
            e += Pn(n);
        })).next((function() {
            var n = new Kn(e);
            return t.store(Kn.store).put(Kn.key, n);
        }));
    }, t.prototype.removeAcknowledgedMutations = function(t) {
        var e = this, n = t.store(jn.store), r = t.store(Bn.store);
        return n.eo().next((function(n) {
            return Be.forEach(n, (function(n) {
                var i = IDBKeyRange.bound([ n.userId, -1 ], [ n.userId, n.lastAcknowledgedBatchId ]);
                return r.eo(Bn.userMutationsIndex, i).next((function(r) {
                    return Be.forEach(r, (function(r) {
                        Ve(r.userId === n.userId);
                        var i = e.serializer.Ro(r);
                        return En(t, n.userId, i).next((function() {}));
                    }));
                }));
            }));
        }));
    }, 
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */
    t.prototype.ensureSequenceNumbers = function(t) {
        var e = t.store(Hn.store), n = t.store(Wn.store);
        return kn(t).next((function(t) {
            var r = [];
            return n.ro((function(n, i) {
                var o = new R(n), s = function(t) {
                    return [ 0, sn(t) ];
                }(o);
                r.push(e.get(s).next((function(n) {
                    return n ? Be.resolve() : function(n) {
                        return e.put(new Hn(0, sn(n), t));
                    }(o);
                })));
            })).next((function() {
                return Be.vn(r);
            }));
        }));
    }, t.prototype.createCollectionParentIndex = function(t, e) {
        // Create the index.
        t.createObjectStore($n.store, {
            keyPath: $n.keyPath
        });
        var n = e.store($n.store), r = new Un, i = function(t) {
            if (r.add(t)) {
                var e = t.O(), i = t.M();
                return n.put({
                    collectionId: e,
                    parent: sn(i)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
        // Index existing remote documents.
                return e.store(Wn.store).ro({
            no: !0
        }, (function(t, e) {
            var n = new R(t);
            return i(n.M());
        })).next((function() {
            return e.store(Gn.store).ro({
                no: !0
            }, (function(t, e) {
                t[0];
                var n = t[1], r = (t[2], hn(n));
                return i(r.M());
            }));
        }));
    }, t.prototype.rewriteCanonicalIds = function(t) {
        var e = this, n = t.store(Yn.store);
        return n.ro((function(t, r) {
            var i = e.serializer.Go(r), o = e.serializer.zo(i);
            return n.put(o);
        }));
    }, t;
}(), Cn = function(t, e) {
    this.seconds = t, this.nanoseconds = e;
}, Fn = function(t, 
/** Whether to allow shared access from multiple tabs. */
e, n) {
    this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n;
};

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */
/**
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */
Fn.store = "owner", 
/**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
Fn.key = "owner";

var jn = function(
/**
     * The normalized user ID to which this queue belongs.
     */
t, 
/**
     * An identifier for the highest numbered batch that has been acknowledged
     * by the server. All MutationBatches in this queue with batchIds less
     * than or equal to this value are considered to have been acknowledged by
     * the server.
     *
     * NOTE: this is deprecated and no longer used by the code.
     */
e, 
/**
     * A stream token that was previously sent by the server.
     *
     * See StreamingWriteRequest in datastore.proto for more details about
     * usage.
     *
     * After sending this token, earlier tokens may not be used anymore so
     * only a single stream token is retained.
     */
n) {
    this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n;
};

/** Name of the IndexedDb object store.  */ jn.store = "mutationQueues", 
/** Keys are automatically assigned via the userId property. */
jn.keyPath = "userId";

/**
 * An object to be stored in the 'mutations' store in IndexedDb.
 *
 * Represents a batch of user-level mutations intended to be sent to the server
 * in a single write. Each user-level batch gets a separate DbMutationBatch
 * with a new batchId.
 */
var Bn = function(
/**
     * The normalized user ID to which this batch belongs.
     */
t, 
/**
     * An identifier for this batch, allocated using an auto-generated key.
     */
e, 
/**
     * The local write time of the batch, stored as milliseconds since the
     * epoch.
     */
n, 
/**
     * A list of "mutations" that represent a partial base state from when this
     * write batch was initially created. During local application of the write
     * batch, these baseMutations are applied prior to the real writes in order
     * to override certain document fields from the remote document cache. This
     * is necessary in the case of non-idempotent writes (e.g. `increment()`
     * transforms) to make sure that the local view of the modified documents
     * doesn't flicker if the remote document cache receives the result of the
     * non-idempotent write before the write is removed from the queue.
     *
     * These mutations are never sent to the backend.
     */
r, 
/**
     * A list of mutations to apply. All mutations will be applied atomically.
     *
     * Mutations are serialized via JsonProtoSerializer.toMutation().
     */
i) {
    this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = r, 
    this.mutations = i;
};

/** Name of the IndexedDb object store.  */ Bn.store = "mutations", 
/** Keys are automatically assigned via the userId, batchId properties. */
Bn.keyPath = "batchId", 
/** The index name for lookup of mutations by user. */
Bn.userMutationsIndex = "userMutationsIndex", 
/** The user mutations index is keyed by [userId, batchId] pairs. */
Bn.userMutationsKeyPath = [ "userId", "batchId" ];

var Gn = /** @class */ function() {
    function t() {}
    /**
     * Creates a [userId] key for use in the DbDocumentMutations index to iterate
     * over all of a user's document mutations.
     */    return t.prefixForUser = function(t) {
        return [ t ];
    }, 
    /**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */
    t.prefixForPath = function(t, e) {
        return [ t, sn(e) ];
    }, 
    /**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */
    t.key = function(t, e, n) {
        return [ t, sn(e), n ];
    }, t;
}();

Gn.store = "documentMutations", 
/**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
Gn.PLACEHOLDER = new Gn;

var zn = function(t, e) {
    this.path = t, this.readTime = e;
}, Qn = function(t, e) {
    this.path = t, this.version = e;
}, Wn = 
// TODO: We are currently storing full document keys almost three times
// (once as part of the primary key, once - partly - as `parentPath` and once
// inside the encoded documents). During our next migration, we should
// rewrite the primary key as parentPath + document ID which would allow us
// to drop one value.
function(
/**
     * Set to an instance of DbUnknownDocument if the data for a document is
     * not known, but it is known that a document exists at the specified
     * version (e.g. it had a successful update applied to it)
     */
t, 
/**
     * Set to an instance of a DbNoDocument if it is known that no document
     * exists.
     */
e, 
/**
     * Set to an instance of a Document if there's a cached version of the
     * document.
     */
n, 
/**
     * Documents that were written to the remote document store based on
     * a write acknowledgment are marked with `hasCommittedMutations`. These
     * documents are potentially inconsistent with the backend's copy and use
     * the write's commit version as their document version.
     */
r, 
/**
     * When the document was read from the backend. Undefined for data written
     * prior to schema version 9.
     */
i, 
/**
     * The path of the collection this document is part of. Undefined for data
     * written prior to schema version 9.
     */
o) {
    this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = r, 
    this.readTime = i, this.parentPath = o;
};

/**
 * Represents a document that is known to exist but whose data is unknown.
 * Stored in IndexedDb as part of a DbRemoteDocument object.
 */ Wn.store = "remoteDocuments", 
/**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
Wn.readTimeIndex = "readTimeIndex", Wn.readTimeIndexPath = "readTime", 
/**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
Wn.collectionReadTimeIndex = "collectionReadTimeIndex", Wn.collectionReadTimeIndexPath = [ "parentPath", "readTime" ];

/**
 * Contains a single entry that has metadata about the remote document cache.
 */
var Kn = 
/**
     * @param byteSize Approximately the total size in bytes of all the documents in the document
     * cache.
     */
function(t) {
    this.byteSize = t;
};

Kn.store = "remoteDocumentGlobal", Kn.key = "remoteDocumentGlobalKey";

var Yn = function(
/**
     * An auto-generated sequential numeric identifier for the query.
     *
     * Queries are stored using their canonicalId as the key, but these
     * canonicalIds can be quite long so we additionally assign a unique
     * queryId which can be used by referenced data structures (e.g.
     * indexes) to minimize the on-disk cost.
     */
t, 
/**
     * The canonical string representing this query. This is not unique.
     */
e, 
/**
     * The last readTime received from the Watch Service for this query.
     *
     * This is the same value as TargetChange.read_time in the protos.
     */
n, 
/**
     * An opaque, server-assigned token that allows watching a query to be
     * resumed after disconnecting without retransmitting all the data
     * that matches the query. The resume token essentially identifies a
     * point in time from which the server should resume sending results.
     *
     * This is related to the snapshotVersion in that the resumeToken
     * effectively also encodes that value, but the resumeToken is opaque
     * and sometimes encodes additional information.
     *
     * A consequence of this is that the resumeToken should be used when
     * asking the server to reason about where this client is in the watch
     * stream, but the client should use the snapshotVersion for its own
     * purposes.
     *
     * This is the same value as TargetChange.resume_token in the protos.
     */
r, 
/**
     * A sequence number representing the last time this query was
     * listened to, used for garbage collection purposes.
     *
     * Conventionally this would be a timestamp value, but device-local
     * clocks are unreliable and they must be able to create new listens
     * even while disconnected. Instead this should be a monotonically
     * increasing number that's incremented on each listen call.
     *
     * This is different from the queryId since the queryId is an
     * immutable identifier assigned to the Query on first use while
     * lastListenSequenceNumber is updated every time the query is
     * listened to.
     */
i, 
/**
     * Denotes the maximum snapshot version at which the associated query view
     * contained no limbo documents.  Undefined for data written prior to
     * schema version 9.
     */
o, 
/**
     * The query for this target.
     *
     * Because canonical ids are not unique we must store the actual query. We
     * use the proto to have an object we can persist without having to
     * duplicate translation logic to and from a `Query` object.
     */
s) {
    this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = r, 
    this.lastListenSequenceNumber = i, this.lastLimboFreeSnapshotVersion = o, this.query = s;
};

Yn.store = "targets", 
/** Keys are automatically assigned via the targetId property. */
Yn.keyPath = "targetId", 
/** The name of the queryTargets index. */
Yn.queryTargetsIndexName = "queryTargetsIndex", 
/**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
Yn.queryTargetsKeyPath = [ "canonicalId", "targetId" ];

/**
 * An object representing an association between a target and a document, or a
 * sentinel row marking the last sequence number at which a document was used.
 * Each document cached must have a corresponding sentinel row before lru
 * garbage collection is enabled.
 *
 * The target associations and sentinel rows are co-located so that orphaned
 * documents and their sequence numbers can be identified efficiently via a scan
 * of this store.
 */
var Hn = function(
/**
     * The targetId identifying a target or 0 for a sentinel row.
     */
t, 
/**
     * The path to the document, as encoded in the key.
     */
e, 
/**
     * If this is a sentinel row, this should be the sequence number of the last
     * time the document specified by `path` was used. Otherwise, it should be
     * `undefined`.
     */
n) {
    this.targetId = t, this.path = e, this.sequenceNumber = n;
};

/** Name of the IndexedDb object store.  */ Hn.store = "targetDocuments", 
/** Keys are automatically assigned via the targetId, path properties. */
Hn.keyPath = [ "targetId", "path" ], 
/** The index name for the reverse index. */
Hn.documentTargetsIndex = "documentTargetsIndex", 
/** We also need to create the reverse index for these properties. */
Hn.documentTargetsKeyPath = [ "path", "targetId" ];

/**
 * A record of global state tracked across all Targets, tracked separately
 * to avoid the need for extra indexes.
 *
 * This should be kept in-sync with the proto used in the iOS client.
 */
var Xn = function(
/**
     * The highest numbered target id across all targets.
     *
     * See DbTarget.targetId.
     */
t, 
/**
     * The highest numbered lastListenSequenceNumber across all targets.
     *
     * See DbTarget.lastListenSequenceNumber.
     */
e, 
/**
     * A global snapshot version representing the last consistent snapshot we
     * received from the backend. This is monotonically increasing and any
     * snapshots received from the backend prior to this version (e.g. for
     * targets resumed with a resumeToken) should be suppressed (buffered)
     * until the backend has caught up to this snapshot version again. This
     * prevents our cache from ever going backwards in time.
     */
n, 
/**
     * The number of targets persisted.
     */
r) {
    this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, 
    this.targetCount = r;
};

/**
 * The key string used for the single object that exists in the
 * DbTargetGlobal store.
 */ Xn.key = "targetGlobalKey", Xn.store = "targetGlobal";

/**
 * An object representing an association between a Collection id (e.g. 'messages')
 * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
 * This is used to efficiently find all collections to query when performing
 * a Collection Group query.
 */
var $n = function(
/**
     * The collectionId (e.g. 'messages')
     */
t, 
/**
     * The path to the parent (either a document location or an empty path for
     * a root-level collection).
     */
e) {
    this.collectionId = t, this.parent = e;
};

/** Name of the IndexedDb object store. */ function Zn(t) {
    t.createObjectStore(Hn.store, {
        keyPath: Hn.keyPath
    }).createIndex(Hn.documentTargetsIndex, Hn.documentTargetsKeyPath, {
        unique: !0
    }), 
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore(Yn.store, {
        keyPath: Yn.keyPath
    }).createIndex(Yn.queryTargetsIndexName, Yn.queryTargetsKeyPath, {
        unique: !0
    }), t.createObjectStore(Xn.store);
}

$n.store = "collectionParents", 
/** Keys are automatically assigned via the collectionId, parent properties. */
$n.keyPath = [ "collectionId", "parent" ];

var Jn = function(
// Note: Previous schema versions included a field
// "lastProcessedDocumentChangeId". Don't use anymore.
/** The auto-generated client id assigned at client startup. */
t, 
/** The last time this state was updated. */
e, 
/** Whether the client's network connection is enabled. */
n, 
/** Whether this client is running in a foreground tab. */
r) {
    this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = r;
};

/** Name of the IndexedDb object store. */ Jn.store = "clientMetadata", 
/** Keys are automatically assigned via the clientId properties. */
Jn.keyPath = "clientId";

var tr = r(r(r([ jn.store, Bn.store, Gn.store, Wn.store, Yn.store, Fn.store, Xn.store, Hn.store ], [ Jn.store ]), [ Kn.store ]), [ $n.store ]), er = /** @class */ function() {
    function t() {
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be used to
         * satisfy reads.
         */
        this.ga = new Un;
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */    return t.prototype.Io = function(t, e) {
        var n = this;
        if (!this.ga.has(e)) {
            var r = e.O(), i = e.M();
            t.qn((function() {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                n.ga.add(e);
            }));
            var o = {
                collectionId: r,
                parent: sn(i)
            };
            return nr(t).put(o);
        }
        return Be.resolve();
    }, t.prototype.ir = function(t, e) {
        var n = [], r = IDBKeyRange.bound([ e, "" ], [ Ue(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return nr(t).eo(r).next((function(t) {
            for (var r = 0, i = t; r < i.length; r++) {
                var o = i[r];
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                                if (o.collectionId !== e) break;
                n.push(hn(o.parent));
            }
            return n;
        }));
    }, t;
}();

// V2 is no longer usable (see comment at top of file)
// Visible for testing
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A persisted implementation of IndexManager.
 */
/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */
function nr(t) {
    return sr.Kh(t, $n.store);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Serializer for values stored in the LocalStore. */ var rr = /** @class */ function() {
    function t(t) {
        this.pa = t;
    }
    /** Decodes a remote document from storage locally to a Document. */    return t.prototype._a = function(t) {
        if (t.document) return this.pa.mi(t.document, !!t.hasCommittedMutations);
        if (t.noDocument) {
            var e = L.st(t.noDocument.path), n = this.ya(t.noDocument.readTime);
            return new St(e, n, {
                hasCommittedMutations: !!t.hasCommittedMutations
            });
        }
        if (t.unknownDocument) {
            var r = L.st(t.unknownDocument.path), i = this.ya(t.unknownDocument.version);
            return new xt(r, i);
        }
        return xe();
    }, 
    /** Encodes a document for storage locally. */ t.prototype.Pa = function(t, e) {
        var n = this.ca(e), r = t.key.path.M().W();
        if (t instanceof kt) {
            var i = this.pa.Ai(t), o = t.hasCommittedMutations;
            return new Wn(
            /* unknownDocument= */ null, 
            /* noDocument= */ null, i, o, n, r);
        }
        if (t instanceof St) {
            var s = t.key.path.W(), u = this.ba(t.version), a = t.hasCommittedMutations;
            return new Wn(
            /* unknownDocument= */ null, new zn(s, u), 
            /* document= */ null, a, n, r);
        }
        if (t instanceof xt) {
            var h = t.key.path.W(), c = this.ba(t.version);
            return new Wn(new Qn(h, c), 
            /* noDocument= */ null, 
            /* document= */ null, 
            /* hasCommittedMutations= */ !0, n, r);
        }
        return xe();
    }, t.prototype.ca = function(t) {
        var e = t.C();
        return [ e.seconds, e.nanoseconds ];
    }, t.prototype.fa = function(t) {
        var e = new S(t[0], t[1]);
        return x.v(e);
    }, t.prototype.ba = function(t) {
        var e = t.C();
        return new Cn(e.seconds, e.nanoseconds);
    }, t.prototype.ya = function(t) {
        var e = new S(t.seconds, t.nanoseconds);
        return x.v(e);
    }, 
    /** Encodes a batch of mutations into a DbMutationBatch for local storage. */ t.prototype.Eo = function(t, e) {
        var n = this, r = e.baseMutations.map((function(t) {
            return n.pa.vi(t);
        })), i = e.mutations.map((function(t) {
            return n.pa.vi(t);
        }));
        return new Bn(t, e.batchId, e.Tn.toMillis(), r, i);
    }, 
    /** Decodes a DbMutationBatch into a MutationBatch */ t.prototype.Ro = function(t) {
        var e = this, n = (t.baseMutations || []).map((function(t) {
            return e.pa.Fi(t);
        })), r = t.mutations.map((function(t) {
            return e.pa.Fi(t);
        })), i = S.fromMillis(t.localWriteTimeMs);
        return new Fe(t.batchId, i, n, r);
    }, 
    /** Decodes a DbTarget into TargetData */ t.prototype.Go = function(t) {
        var e, n = this.ya(t.readTime), r = void 0 !== t.lastLimboFreeSnapshotVersion ? this.ya(t.lastLimboFreeSnapshotVersion) : x.min();
        return e = void 0 !== t.query.documents ? this.pa.xi(t.query) : this.pa.Wi(t.query), 
        new jt(e, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, n, r, C.fromBase64String(t.resumeToken));
    }, 
    /** Encodes TargetData into a DbTarget for storage locally. */ t.prototype.zo = function(t) {
        var e, n = this.ba(t.Ee), r = this.ba(t.lastLimboFreeSnapshotVersion);
        e = t.target.Ot() ? this.pa.Oi(t.target) : this.pa.Bi(t.target);
        // We can't store the resumeToken as a ByteString in IndexedDb, so we
        // convert it to a base64 string for storage.
        var i = t.resumeToken.toBase64();
        // lastListenSequenceNumber is always 0 until we do real GC.
                return new Yn(t.targetId, t.target.canonicalId(), n, i, t.sequenceNumber, r, e);
    }, t;
}(), ir = "Another tab has exclusive access to the persistence layer. To allow shared access, make sure to invoke `enablePersistence()` with `synchronizeTabs:true` in all tabs.", or = /** @class */ function(e) {
    function n(t, n) {
        var r = this;
        return (r = e.call(this) || this).bo = t, r.va = n, r;
    }
    return t(n, e), n;
}(Qe), sr = /** @class */ function() {
    function t(e, n, r, i, o, s, u, a) {
        if (this.allowTabSynchronization = e, this.persistenceKey = n, this.clientId = r, 
        this.Tr = s, this.Sa = a, this.Da = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.Ca = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.Fa = null, 
        /** The client metadata refresh task. */
        this.Na = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.ka = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.$a = function(t) {
            return Promise.resolve();
        }, !t.Uh()) throw new I(T.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        if (this.oo = new hr(this, o), this.Ma = n + t.La, this.serializer = new rr(u), 
        this.document = i.document, this.Oa = new An(this.oo, this.serializer), this.jn = new er, 
        this.Qn = new xn(this.serializer, this.jn), !i.window || !i.window.localStorage) throw new I(T.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        this.window = i.window, this.xa = this.window.localStorage;
    }
    return t.Kh = function(t, e) {
        if (t instanceof or) return cn.Kh(t.bo, e);
        throw xe();
    }, 
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @return {Promise<void>} Whether persistence was enabled.
     */
    t.prototype.start = function() {
        var t = this;
        return cn.qh(this.Ma, qn, new Mn(this.serializer)).then((function(e) {
            return t.Ba = e, t.qa();
        })).then((function() {
            return t.Ua(), t.Qa(), t.Wa(), t.Ba.runTransaction("readonly", [ Xn.store ], (function(t) {
                return kn(t);
            }));
        })).then((function(e) {
            t.ja = new Ye(e, t.Sa);
        })).then((function() {
            t.Da = !0;
        })).catch((function(e) {
            return t.Ba && t.Ba.close(), Promise.reject(e);
        }));
    }, 
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.Ka = function(t) {
        var r = this;
        return this.$a = function(i) {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(e) {
                    return this.vh ? [ 2 /*return*/ , t(i) ] : [ 2 /*return*/ ];
                }));
            }));
        }, t(this.isPrimary);
    }, 
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.Ga = function(t) {
        var r = this;
        this.Ba.Gh((function(i) {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return null === i.newVersion ? [ 4 /*yield*/ , t() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        e.sent(), e.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype.za = function(t) {
        var r = this;
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.Tr.$r((function() {
            return e(r, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        return this.vh ? [ 4 /*yield*/ , this.qa() ] : [ 3 /*break*/ , 2 ];

                      case 1:
                        t.sent(), t.label = 2;

                      case 2:
                        return [ 2 /*return*/ ];
                    }
                }));
            }));
        })));
    }, 
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */
    t.prototype.qa = function() {
        var t = this;
        return this.Ba.runTransaction("readwrite", tr, (function(e) {
            return ar(e).put(new Jn(t.clientId, Date.now(), t.networkEnabled, t.inForeground)).next((function() {
                if (t.isPrimary) return t.Ha(e).next((function(e) {
                    e || (t.isPrimary = !1, t.Tr.$r((function() {
                        return t.$a(!1);
                    })));
                }));
            })).next((function() {
                return t.Ya(e);
            })).next((function(n) {
                return t.isPrimary && !n ? t.Ja(e).next((function() {
                    return !1;
                })) : !!n && t.Xa(e).next((function() {
                    return !0;
                }));
            }));
        })).catch((function(e) {
            if (!t.allowTabSynchronization) throw e;
            return De("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", e), 
            /* isPrimary= */ !1;
        })).then((function(e) {
            t.isPrimary !== e && t.Tr.$r((function() {
                return t.$a(e);
            })), t.isPrimary = e;
        }));
    }, t.prototype.Ha = function(t) {
        var e = this;
        return ur(t).get(Fn.key).next((function(t) {
            return Be.resolve(e.Za(t));
        }));
    }, t.prototype.tu = function(t) {
        return ar(t).delete(this.clientId);
    }, 
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */
    t.prototype.eu = function() {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return !this.isPrimary || this.su(this.ka, 18e5) ? [ 3 /*break*/ , 2 ] : (this.ka = Date.now(), 
                    [ 4 /*yield*/ , this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (function(n) {
                        var r = t.Kh(n, Jn.store);
                        return r.eo().next((function(t) {
                            var n = e.iu(t, 18e5), i = t.filter((function(t) {
                                return -1 === n.indexOf(t);
                            }));
                            // Delete metadata for clients that are no longer considered active.
                                                        return Be.forEach(i, (function(t) {
                                return r.delete(t.clientId);
                            })).next((function() {
                                return i;
                            }));
                        }));
                    })).catch((function() {
                        return [];
                    })) ]);

                  case 1:
                    // Delete potential leftover entries that may continue to mark the
                    // inactive clients as zombied in LocalStorage.
                    // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                    // the client atomically, but we can't. So we opt to delete the IndexedDb
                    // entries first to avoid potentially reviving a zombied client.
                    n.sent().forEach((function(t) {
                        e.window.localStorage.removeItem(e.nu(t.clientId));
                    })), n.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */
    t.prototype.Wa = function() {
        var t = this;
        this.Na = this.Tr.yr("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (function() {
            return t.qa().then((function() {
                return t.eu();
            })).then((function() {
                return t.Wa();
            }));
        }));
    }, 
    /** Checks whether `client` is the local client. */ t.prototype.Za = function(t) {
        return !!t && t.ownerId === this.clientId;
    }, 
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */
    t.prototype.Ya = function(t) {
        var e = this;
        return ur(t).get(Fn.key).next((function(n) {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            if (null !== n && e.su(n.leaseTimestampMs, 5e3) && !e.ru(n.ownerId)) {
                if (e.Za(n) && e.networkEnabled) return !0;
                if (!e.Za(n)) {
                    if (!n.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new I(T.FAILED_PRECONDITION, ir);
                    return !1;
                }
            }
            return !(!e.networkEnabled || !e.inForeground) || ar(t).eo().next((function(t) {
                return void 0 === e.iu(t, 5e3).find((function(t) {
                    if (e.clientId !== t.clientId) {
                        var n = !e.networkEnabled && t.networkEnabled, r = !e.inForeground && t.inForeground, i = e.networkEnabled === t.networkEnabled;
                        if (n || r && i) return !0;
                    }
                    return !1;
                }));
            }));
        })).next((function(t) {
            return e.isPrimary !== t && De("IndexedDbPersistence", "Client " + (t ? "is" : "is not") + " eligible for a primary lease."), 
            t;
        }));
    }, t.prototype.hu = function() {
        return e(this, void 0, void 0, (function() {
            var t = this;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return this.Da = !1, this.ou(), this.Na && (this.Na.cancel(), this.Na = null), this.au(), 
                    this.uu(), [ 4 /*yield*/ , this.Ba.runTransaction("readwrite", [ Fn.store, Jn.store ], (function(e) {
                        return t.Ja(e).next((function() {
                            return t.tu(e);
                        }));
                    })) ];

                  case 1:
                    // The shutdown() operations are idempotent and can be called even when
                    // start() aborted (e.g. because it couldn't acquire the persistence lease).
                    return e.sent(), this.Ba.close(), 
                    // Remove the entry marking the client as zombied from LocalStorage since
                    // we successfully deleted its metadata from IndexedDb.
                    this.cu(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */
    t.prototype.iu = function(t, e) {
        var n = this;
        return t.filter((function(t) {
            return n.su(t.updateTimeMs, e) && !n.ru(t.clientId);
        }));
    }, 
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */
    t.prototype._u = function() {
        var t = this;
        return this.Ba.runTransaction("readonly", [ Jn.store ], (function(e) {
            return ar(e).eo().next((function(e) {
                return t.iu(e, 18e5).map((function(t) {
                    return t.clientId;
                }));
            }));
        }));
    }, t.clearPersistence = function(r) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return t.Uh() ? (e = r + t.La, [ 4 /*yield*/ , cn.delete(e) ]) : [ 2 /*return*/ , Promise.resolve() ];

                  case 1:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, Object.defineProperty(t.prototype, "vh", {
        get: function() {
            return this.Da;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.lu = function(t) {
        return gn.uo(t, this.serializer, this.jn, this.oo);
    }, t.prototype.du = function() {
        return this.Oa;
    }, t.prototype.fu = function() {
        return this.Qn;
    }, t.prototype.Tu = function() {
        return this.jn;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        De("IndexedDbPersistence", "Starting transaction:", t);
        var i, o = "readonly" === e ? "readonly" : "readwrite";
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
        return this.Ba.runTransaction(o, tr, (function(o) {
            return i = new or(o, r.ja.next()), "readwrite-primary" === e ? r.Ha(o).next((function(t) {
                return !!t || r.Ya(o);
            })).next((function(e) {
                if (!e) throw ke("Failed to obtain primary lease for action '" + t + "'."), r.isPrimary = !1, 
                r.Tr.$r((function() {
                    return r.$a(!1);
                })), new I(T.FAILED_PRECONDITION, ze);
                return n(i);
            })).next((function(t) {
                return r.Xa(o).next((function() {
                    return t;
                }));
            })) : r.Eu(o).next((function() {
                return n(i);
            }));
        })).then((function(t) {
            return i.Un(), t;
        }));
    }, 
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    t.prototype.Eu = function(t) {
        var e = this;
        return ur(t).get(Fn.key).next((function(t) {
            if (null !== t && e.su(t.leaseTimestampMs, 5e3) && !e.ru(t.ownerId) && !e.Za(t) && !t.allowTabSynchronization) throw new I(T.FAILED_PRECONDITION, ir);
        }));
    }, 
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */
    t.prototype.Xa = function(t) {
        var e = new Fn(this.clientId, this.allowTabSynchronization, Date.now());
        return ur(t).put(Fn.key, e);
    }, t.Uh = function() {
        return cn.Uh();
    }, 
    /**
     * Generates a string used as a prefix when storing data in IndexedDB and
     * LocalStorage.
     */
    t.Iu = function(t) {
        // Use two different prefix formats:
        //   * firestore / persistenceKey / projectID . databaseID / ...
        //   * firestore / persistenceKey / projectID / ...
        // projectIDs are DNS-compatible names and cannot contain dots
        // so there's no danger of collisions.
        var e = t.ii.projectId;
        return t.ii.ln || (e += "." + t.ii.database), "firestore/" + t.persistenceKey + "/" + e + "/";
    }, 
    /** Checks the primary lease and removes it if we are the current primary. */ t.prototype.Ja = function(t) {
        var e = this, n = ur(t);
        return n.get(Fn.key).next((function(t) {
            return e.Za(t) ? (De("IndexedDbPersistence", "Releasing primary lease."), n.delete(Fn.key)) : Be.resolve();
        }));
    }, 
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */ t.prototype.su = function(t, e) {
        var n = Date.now();
        return !(t < n - e || t > n && (ke("Detected an update time that is in the future: " + t + " > " + n), 
        1));
    }, t.prototype.Ua = function() {
        var t = this;
        null !== this.document && "function" == typeof this.document.addEventListener && (this.Fa = function() {
            t.Tr.$r((function() {
                return t.inForeground = "visible" === t.document.visibilityState, t.qa();
            }));
        }, this.document.addEventListener("visibilitychange", this.Fa), this.inForeground = "visible" === this.document.visibilityState);
    }, t.prototype.au = function() {
        this.Fa && (this.document.removeEventListener("visibilitychange", this.Fa), this.Fa = null);
    }, 
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */
    t.prototype.Qa = function() {
        var t = this;
        "function" == typeof this.window.addEventListener && (this.Ca = function() {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            t.ou(), t.Tr.$r((function() {
                return t.hu();
            }));
        }, this.window.addEventListener("unload", this.Ca));
    }, t.prototype.uu = function() {
        this.Ca && (this.window.removeEventListener("unload", this.Ca), this.Ca = null);
    }, 
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */
    t.prototype.ru = function(t) {
        try {
            var e = null !== this.xa.getItem(this.nu(t));
            return De("IndexedDbPersistence", "Client '" + t + "' " + (e ? "is" : "is not") + " zombied in LocalStorage"), 
            e;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return ke("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }, 
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */
    t.prototype.ou = function() {
        try {
            this.xa.setItem(this.nu(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            ke("Failed to set zombie client id.", t);
        }
    }, 
    /** Removes the zombied client entry if it exists. */ t.prototype.cu = function() {
        try {
            this.xa.removeItem(this.nu(this.clientId));
        } catch (t) {
            // Ignore
        }
    }, t.prototype.nu = function(t) {
        return "firestore_zombie_" + this.persistenceKey + "_" + t;
    }, t;
}();

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The name of the main (and currently only) IndexedDB database. this name is
 * appended to the prefix provided to the IndexedDbPersistence constructor.
 */
/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */
function ur(t) {
    return t.store(Fn.store);
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function ar(t) {
    return t.store(Jn.store);
}

/** Provides LRU functionality for IndexedDB persistence. */ sr.La = "main";

var hr = /** @class */ function() {
    function t(t, e) {
        this.db = t, this.Vh = new on(this, e);
    }
    return t.prototype.Fh = function(t) {
        var e = this.wu(t);
        return this.db.du().Ho(t).next((function(t) {
            return e.next((function(e) {
                return t + e;
            }));
        }));
    }, t.prototype.wu = function(t) {
        var e = 0;
        return this.kh(t, (function(t) {
            e++;
        })).next((function() {
            return e;
        }));
    }, t.prototype.js = function(t, e) {
        return this.db.du().js(t, e);
    }, t.prototype.kh = function(t, e) {
        return this.Ru(t, (function(t, n) {
            return e(n);
        }));
    }, t.prototype.Xo = function(t, e, n) {
        return cr(t, n);
    }, t.prototype.ta = function(t, e, n) {
        return cr(t, n);
    }, t.prototype.$h = function(t, e, n) {
        return this.db.du().$h(t, e, n);
    }, t.prototype.So = function(t, e) {
        return cr(t, e);
    }, 
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */
    t.prototype.Au = function(t, e) {
        return function(t, e) {
            var n = !1;
            return In(t).ho((function(r) {
                return wn(t, r, e).next((function(t) {
                    return t && (n = !0), Be.resolve(!t);
                }));
            })).next((function() {
                return n;
            }));
        }(t, e);
    }, t.prototype.Mh = function(t, e) {
        var n = this, r = this.db.fu().Ea(), i = [], o = 0;
        return this.Ru(t, (function(s, u) {
            if (u <= e) {
                var a = n.Au(t, s).next((function(e) {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return o++, r.Mn(t, s).next((function() {
                        return r.$n(s), Sn(t).delete([ 0, sn(s.path) ]);
                    }));
                }));
                i.push(a);
            }
        })).next((function() {
            return Be.vn(i);
        })).next((function() {
            return r.apply(t);
        })).next((function() {
            return o;
        }));
    }, t.prototype.removeTarget = function(t, e) {
        var n = e.Ie(t.va);
        return this.db.du().Wo(t, n);
    }, t.prototype.mu = function(t, e) {
        return cr(t, e);
    }, 
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */
    t.prototype.Ru = function(t, e) {
        var n, r = Sn(t), i = Ye.dr;
        return r.ro({
            index: Hn.documentTargetsIndex
        }, (function(t, r) {
            var o = t[0], s = (t[1], r.path), u = r.sequenceNumber;
            0 === o ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== Ye.dr && e(new L(hn(n)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = u, n = s) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = Ye.dr;
        })).next((function() {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== Ye.dr && e(new L(hn(n)), i);
        }));
    }, t.prototype.Oh = function(t) {
        return this.db.fu().Ra(t);
    }, t;
}();

function cr(t, e) {
    return Sn(t).put(
    /**
 * @return A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return new Hn(0, sn(t.path), e);
    }(e, t.va));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Local storage in the Firestore client. Coordinates persistence components
 * like the mutation queue and remote document cache to present a
 * latency-compensated view of stored data.
 *
 * The LocalStore is responsible for accepting mutations from the Sync Engine.
 * Writes from the client are put into a queue as provisional Mutations until
 * they are processed by the RemoteStore and confirmed as having been written
 * to the server.
 *
 * The local store provides the local version of documents that have been
 * modified locally. It maintains the constraint:
 *
 *   LocalDocument = RemoteDocument + Active(LocalMutations)
 *
 * (Active mutations are those that are enqueued and have not been previously
 * acknowledged or rejected).
 *
 * The RemoteDocument ("ground truth") state is provided via the
 * applyChangeBatch method. It will be some version of a server-provided
 * document OR will be a server-provided document PLUS acknowledged mutations:
 *
 *   RemoteDocument' = RemoteDocument + Acknowledged(LocalMutations)
 *
 * Note that this "dirty" version of a RemoteDocument will not be identical to a
 * server base version, since it has LocalMutations added to it pending getting
 * an authoritative copy from the server.
 *
 * Since LocalMutations can be rejected by the server, we have to be able to
 * revert a LocalMutation that has already been applied to the LocalDocument
 * (typically done by replaying all remaining LocalMutations to the
 * RemoteDocument to re-apply).
 *
 * The LocalStore is responsible for the garbage collection of the documents it
 * contains. For now, it every doc referenced by a view, the mutation queue, or
 * the RemoteStore.
 *
 * It also maintains the persistence of mapping queries to resume tokens and
 * target ids. It needs to know this data about queries to properly know what
 * docs it would be allowed to garbage collect.
 *
 * The LocalStore must be able to efficiently execute queries against its local
 * cache of the documents, to provide the initial set of results before any
 * remote changes have been received.
 *
 * Note: In TypeScript, most methods return Promises since the implementation
 * may rely on fetching data from IndexedDB which is async.
 * These Promises will only be rejected on an I/O error or other internal
 * (unexpected) failure (e.g. failed assert) and always represent an
 * unrecoverable error (should be caught / reported by the async_queue).
 */ var fr = /** @class */ function() {
    function t(
    /** Manages our in-memory or durable persistence. */
    t, e, n) {
        this.persistence = t, this.Pu = e, 
        /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
        this.Vu = new Qt(Pe), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.gu = new Ce((function(t) {
            return t.canonicalId();
        })), 
        /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.pu = x.min(), this.Wn = t.lu(n), this.yu = t.fu(), this.Oa = t.du(), this.bu = new We(this.yu, this.Wn, this.persistence.Tu()), 
        this.Pu.vu(this.bu)
        /** Starts the LocalStore. */;
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, 
    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    // PORTING NOTE: Android and iOS only return the documents affected by the
    // change.
    t.prototype.Su = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = this.Wn, r = this.bu, [ 4 /*yield*/ , this.persistence.runTransaction("Handle user change", "readonly", (function(n) {
                        // Swap out the mutation queue, grabbing the pending mutation batches
                        // before and after.
                        var i;
                        return o.Wn.Vo(n).next((function(s) {
                            return i = s, e = o.persistence.lu(t), 
                            // Recreate our LocalDocumentsView using the new
                            // MutationQueue.
                            r = new We(o.yu, e, o.persistence.Tu()), e.Vo(n);
                        })).next((function(t) {
                            for (var e = [], o = [], s = ie(), u = 0, a = i
                            // Union the old/new changed keys.
                            ; u < a.length; u++) {
                                var h = a[u];
                                e.push(h.batchId);
                                for (var c = 0, f = h.mutations; c < f.length; c++) {
                                    var l = f[c];
                                    s = s.add(l.key);
                                }
                            }
                            for (var p = 0, d = t; p < d.length; p++) {
                                var y = d[p];
                                o.push(y.batchId);
                                for (var v = 0, m = y.mutations; v < m.length; v++) {
                                    var g = m[v];
                                    s = s.add(g.key);
                                }
                            }
                            // Return the set of all (potentially) changed documents and the list
                            // of mutation batch IDs that were affected by change.
                                                        return r.Yn(n, s).next((function(t) {
                                return {
                                    Du: t,
                                    Cu: e,
                                    Fu: o
                                };
                            }));
                        }));
                    })) ];

                  case 1:
                    return i = n.sent(), [ 2 /*return*/ , (this.Wn = e, this.bu = r, this.Pu.vu(this.bu), 
                    i) ];
                }
            }));
        }));
    }, 
    /* Accept locally generated Mutations and commit them to storage. */ t.prototype.Nu = function(t) {
        var e, n = this, r = S.now(), i = t.reduce((function(t, e) {
            return t.add(e.key);
        }), ie());
        return this.persistence.runTransaction("Locally write mutations", "readwrite", (function(o) {
            return n.bu.Yn(o, i).next((function(i) {
                e = i;
                for (
                // For non-idempotent mutations (such as `FieldValue.increment()`),
                // we record the base state in a separate patch mutation. This is
                // later used to guarantee consistent values and prevents flicker
                // even if the backend sends us an update that already includes our
                // transform.
                var s = [], u = 0, a = t; u < a.length; u++) {
                    var h = a[u], c = h.Pt(e.get(h.key));
                    null != c && 
                    // NOTE: The base state should only be applied if there's some
                    // existing document to override, so use a Precondition of
                    // exists=true
                    s.push(new gt(h.key, c, Nt(c.proto.mapValue), yt.exists(!0)));
                }
                return n.Wn.To(o, r, s, t);
            }));
        })).then((function(t) {
            var n = t.In(e);
            return {
                batchId: t.batchId,
                Dn: n
            };
        }));
    }, 
    /**
     * Acknowledge the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */
    t.prototype._o = function(t) {
        var e = this;
        return this.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(n) {
            var r = t.batch.keys(), i = e.yu.Ea({
                wa: !0
            });
            return e.Wn._o(n, t.batch, t.streamToken).next((function() {
                return e.ku(n, t, i);
            })).next((function() {
                return i.apply(n);
            })).next((function() {
                return e.Wn.Do(n);
            })).next((function() {
                return e.bu.Yn(n, r);
            }));
        }));
    }, 
    /**
     * Remove mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    t.prototype.$u = function(t) {
        var e = this;
        return this.persistence.runTransaction("Reject batch", "readwrite-primary", (function(n) {
            var r;
            return e.Wn.wo(n, t).next((function(t) {
                return Ve(null !== t), r = t.keys(), e.Wn.yo(n, t);
            })).next((function() {
                return e.Wn.Do(n);
            })).next((function() {
                return e.bu.Yn(n, r);
            }));
        }));
    }, 
    /**
     * Returns the largest (latest) batch id in mutation queue that is pending server response.
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */
    t.prototype.Po = function() {
        var t = this;
        return this.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(e) {
            return t.Wn.Po(e);
        }));
    }, 
    /** Returns the last recorded stream token for the current user. */ t.prototype.do = function() {
        var t = this;
        return this.persistence.runTransaction("Get last stream token", "readonly", (function(e) {
            return t.Wn.do(e);
        }));
    }, 
    /**
     * Sets the stream token for the current user without acknowledging any
     * mutation batch. This is usually only useful after a stream handshake or in
     * response to an error that requires clearing the stream token.
     */
    t.prototype.fo = function(t) {
        var e = this;
        return this.persistence.runTransaction("Set last stream token", "readwrite-primary", (function(n) {
            return e.Wn.fo(n, t);
        }));
    }, 
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    t.prototype.Oo = function() {
        var t = this;
        return this.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(e) {
            return t.Oa.Oo(e);
        }));
    }, 
    /**
     * Update the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */
    t.prototype.Mu = function(e) {
        var n = this, r = e.Ee, i = this.Vu;
        return this.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(o) {
            var s = n.yu.Ea({
                wa: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                        i = n.Vu;
            var u = [];
            e.as.forEach((function(e, s) {
                var a = i.get(s);
                if (a) {
                    // Only update the remote keys if the target is still active. This
                    // ensures that we can persist the updated target data along with
                    // the updated assignment.
                    u.push(n.Oa.Zo(o, e.Is, s).next((function() {
                        return n.Oa.Jo(o, e.Ts, s);
                    })));
                    var h = e.resumeToken;
                    // Update the resume token if the change includes one.
                                        if (h.rt() > 0) {
                        var c = a.we(h, r).Ie(o.va);
                        i = i.Ae(s, c), 
                        // Update the target data if there are target changes (or if
                        // sufficient time has passed since the last update).
                        t.Lu(a, c, e) && u.push(n.Oa.Wo(o, c));
                    }
                }
            }));
            var a = $t(), h = ie();
            // HACK: The only reason we allow a null snapshot version is so that we
            // can synthesize remote events when we get permission denied errors while
            // trying to resolve the state of a locally cached document that is in
            // limbo.
                        if (e.cs.forEach((function(t, e) {
                h = h.add(t);
            })), 
            // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
            // documents in advance in a single call.
            u.push(s.getEntries(o, h).next((function(t) {
                e.cs.forEach((function(i, h) {
                    var c = t.get(i);
                    // Note: The order of the steps below is important, since we want
                    // to ensure that rejected limbo resolutions (which fabricate
                    // NoDocuments with SnapshotVersion.min()) never add documents to
                    // cache.
                                        h instanceof St && h.version.isEqual(x.min()) ? (
                    // NoDocuments with SnapshotVersion.min() are used in manufactured
                    // events. We remove these documents from cache since we lost
                    // access.
                    s.$n(i, r), a = a.Ae(i, h)) : null == c || h.version.S(c.version) > 0 || 0 === h.version.S(c.version) && c.hasPendingWrites ? (s.Nn(h, r), 
                    a = a.Ae(i, h)) : De("LocalStore", "Ignoring outdated watch update for ", i, ". Current version:", c.version, " Watch version:", h.version), 
                    e._s.has(i) && u.push(n.persistence.oo.mu(o, i));
                }));
            }))), !r.isEqual(x.min())) {
                var c = n.Oa.Oo(o).next((function(t) {
                    return n.Oa.Bo(o, o.va, r);
                }));
                u.push(c);
            }
            return Be.vn(u).next((function() {
                return s.apply(o);
            })).next((function() {
                return n.bu.Jn(o, a);
            }));
        })).then((function(t) {
            return n.Vu = i, t;
        }));
    }, 
    /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
    t.Lu = function(t, e, n) {
        // Always persist target data if we don't already have a resume token.
        return Ve(e.resumeToken.rt() > 0), 0 === t.resumeToken.rt() || (e.Ee.D() - t.Ee.D() >= this.Ou || n.Ts.size + n.Es.size + n.Is.size > 0);
        // Don't allow resume token changes to be buffered indefinitely. This
        // allows us to be reasonably up-to-date after a crash and avoids needing
        // to loop over all active queries on shutdown. Especially in the browser
        // we may not get time to do anything interesting while the current tab is
        // closing.
        }, 
    /**
     * Notify local store of the changed views to locally pin documents.
     */
    t.prototype.xu = function(t) {
        var e = this;
        return this.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(n) {
            return Be.forEach(t, (function(t) {
                return Be.forEach(t.hr, (function(r) {
                    return e.persistence.oo.Xo(n, t.targetId, r);
                })).next((function() {
                    return Be.forEach(t.or, (function(r) {
                        return e.persistence.oo.ta(n, t.targetId, r);
                    }));
                }));
            }));
        })).then((function() {
            for (var n = 0, r = t; n < r.length; n++) {
                var i = r[n], o = i.targetId;
                if (!i.fromCache) {
                    var s = e.Vu.get(o), u = s.Ee, a = s.Re(u);
                    // Advance the last limbo free snapshot version
                                        e.Vu = e.Vu.Ae(o, a);
                }
            }
        }));
    }, 
    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */
    t.prototype.Bu = function(t) {
        var e = this;
        return this.persistence.runTransaction("Get next mutation batch", "readonly", (function(n) {
            return void 0 === t && (t = -1), e.Wn.mo(n, t);
        }));
    }, 
    /**
     * Read the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    t.prototype.qu = function(t) {
        var e = this;
        return this.persistence.runTransaction("read document", "readonly", (function(n) {
            return e.bu.Kn(n, t);
        }));
    }, 
    /**
     * Assigns the given target an internal ID so that its results can be pinned so
     * they don't get GC'd. A target must be allocated in the local store before
     * the store can be used to manage its view.
     *
     * Allocating an already allocated `Target` will return the existing `TargetData`
     * for that `Target`.
     */
    t.prototype.Uu = function(t) {
        var e = this;
        return this.persistence.runTransaction("Allocate target", "readwrite", (function(n) {
            var r;
            return e.Oa.Yo(n, t).next((function(i) {
                return i ? (
                // This target has been listened to previously, so reuse the
                // previous targetID.
                // TODO(mcg): freshen last accessed date?
                r = i, Be.resolve(r)) : e.Oa.$o(n).next((function(i) {
                    return r = new jt(t, i, 0 /* Listen */ , n.va), e.Oa.qo(n, r).next((function() {
                        return r;
                    }));
                }));
            }));
        })).then((function(n) {
            return null === e.Vu.get(n.targetId) && (e.Vu = e.Vu.Ae(n.targetId, n), e.gu.set(t, n.targetId)), 
            n;
        }));
    }, 
    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    t.prototype.Yo = function(t, e) {
        var n = this.gu.get(e);
        return void 0 !== n ? Be.resolve(this.Vu.get(n)) : this.Oa.Yo(t, e);
    }, 
    /**
     * Unpin all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    t.prototype.Qu = function(t, e) {
        var n = this, r = this.Vu.get(t), i = e ? "readwrite" : "readwrite-primary";
        return this.persistence.runTransaction("Release target", i, (function(t) {
            return e ? Be.resolve() : n.persistence.oo.removeTarget(t, r);
        })).then((function() {
            n.Vu = n.Vu.remove(t), n.gu.delete(r.target);
        }));
    }, 
    /**
     * Runs the specified query against the local store and returns the results,
     * potentially taking advantage of query data from previous executions (such
     * as the set of remote keys).
     *
     * @param usePreviousResults Whether results from previous executions can
     * be used to optimize this query execution.
     */
    t.prototype.Wu = function(t, e) {
        var n = this, r = x.min(), i = ie();
        return this.persistence.runTransaction("Execute query", "readonly", (function(o) {
            return n.Yo(o, t.ee()).next((function(t) {
                if (t) return r = t.lastLimboFreeSnapshotVersion, n.Oa.ea(o, t.targetId).next((function(t) {
                    i = t;
                }));
            })).next((function() {
                return n.Pu.Zn(o, t, e ? r : x.min(), e ? i : ie());
            })).next((function(t) {
                return {
                    documents: t,
                    ju: i
                };
            }));
        }));
    }, t.prototype.ku = function(t, e, n) {
        var r = this, i = e.batch, o = i.keys(), s = Be.resolve();
        return o.forEach((function(r) {
            s = s.next((function() {
                return n.Mn(t, r);
            })).next((function(t) {
                var o = t, s = e.Rn.get(r);
                Ve(null !== s), (!o || o.version.S(s) < 0) && ((o = i.at(r, o, e)) && 
                // We use the commitVersion as the readTime rather than the
                // document's updateTime since the updateTime is not advanced
                // for updates that do not modify the underlying document.
                n.Nn(o, e.wn));
            }));
        })), s.next((function() {
            return r.Wn.yo(t, i);
        }));
    }, t.prototype.Sh = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.Lh(n, e.Vu);
        }));
    }, t;
}();

/**
 * The maximum time to leave a resume token buffered without writing it out.
 * This value is arbitrary: it's long enough to avoid several writes
 * (possibly indefinitely if updates come more frequently than this) but
 * short enough that restarting after crashing will still have a pretty
 * recent resume token.
 */ fr.Ou = 3e8;

/**
 * An implementation of LocalStore that provides additional functionality
 * for MultiTabSyncEngine.
 */
// PORTING NOTE: Web only.
var lr = /** @class */ function(r) {
    function i(t, e, n) {
        var i = this;
        return (i = r.call(this, t, e, n) || this).persistence = t, i.Wn = t.lu(n), i.yu = t.fu(), 
        i.Oa = t.du(), i;
    }
    /** Starts the LocalStore. */    return t(i, r), i.prototype.start = function() {
        return this.Ku();
    }, 
    /** Returns the local view of the documents affected by a mutation batch. */ i.prototype.Gu = function(t) {
        var e = this;
        return this.persistence.runTransaction("Lookup mutation documents", "readonly", (function(n) {
            return e.Wn.Ao(n, t).next((function(t) {
                return t ? e.bu.Yn(n, t) : Be.resolve(null);
            }));
        }));
    }, i.prototype.zu = function(t) {
        this.Wn.vo(t);
    }, i.prototype.za = function(t) {
        this.persistence.za(t);
    }, i.prototype._u = function() {
        return this.persistence._u();
    }, i.prototype.Hu = function(t) {
        var e = this, n = this.Vu.get(t);
        return n ? Promise.resolve(n.target) : this.persistence.runTransaction("Get target data", "readonly", (function(n) {
            return e.Oa.si(n, t).next((function(t) {
                return t ? t.target : null;
            }));
        }));
    }, 
    /**
     * Returns the set of documents that have been updated since the last call.
     * If this is the first call, returns the set of changes since client
     * initialization. Further invocations will return document changes since
     * the point of rejection.
     */
    i.prototype.la = function() {
        var t = this;
        return this.persistence.runTransaction("Get new document changes", "readonly", (function(e) {
            return t.yu.la(e, t.pu);
        })).then((function(e) {
            var n = e.da, r = e.readTime;
            return t.pu = r, n;
        }));
    }, 
    /**
     * Reads the newest document change from persistence and forwards the internal
     * synchronization marker so that calls to `getNewDocumentChanges()`
     * only return changes that happened after client initialization.
     */
    i.prototype.Ku = function() {
        return e(this, void 0, void 0, (function() {
            var t, e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return t = this, [ 4 /*yield*/ , this.persistence.runTransaction("Synchronize last document change read time", "readonly", (function(t) {
                        return e.yu.Ta(t);
                    })) ];

                  case 1:
                    return t.pu = n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i;
}(fr);

/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err An error returned by a LocalStore operation.
 * @return A Promise that resolves after we recovered, or the original error.
 */ function pr(t) {
    return e(this, void 0, void 0, (function() {
        return n(this, (function(e) {
            if (t.code !== T.FAILED_PRECONDITION || t.message !== ze) throw t;
            return De("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
        }));
    }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */ var dr = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.Yu = new Yt(yr.Ju), 
        // A set of outstanding references to a document sorted by target id.
        this.Xu = new Yt(yr.Zu)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.B = function() {
        return this.Yu.B();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.Xo = function(t, e) {
        var n = new yr(t, e);
        this.Yu = this.Yu.add(n), this.Xu = this.Xu.add(n);
    }, 
    /** Add references to the given document keys for the given ID. */ t.prototype.tc = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.Xo(t, e);
        }));
    }, 
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t.prototype.ta = function(t, e) {
        this.ec(new yr(t, e));
    }, t.prototype.sc = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.ta(t, e);
        }));
    }, 
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t.prototype.ic = function(t) {
        var e = this, n = L.EMPTY, r = new yr(n, t), i = new yr(n, t + 1), o = [];
        return this.Xu.Ke([ r, i ], (function(t) {
            e.ec(t), o.push(t.key);
        })), o;
    }, t.prototype.nc = function() {
        var t = this;
        this.Yu.forEach((function(e) {
            return t.ec(e);
        }));
    }, t.prototype.ec = function(t) {
        this.Yu = this.Yu.delete(t), this.Xu = this.Xu.delete(t);
    }, t.prototype.rc = function(t) {
        var e = L.EMPTY, n = new yr(e, t), r = new yr(e, t + 1), i = ie();
        return this.Xu.Ke([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.Co = function(t) {
        var e = new yr(t, 0), n = this.Yu.ze(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), yr = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.hc = e
        /** Compare by key then by ID */;
    }
    return t.Ju = function(t, e) {
        return L.N(t.key, e.key) || Pe(t.hc, e.hc);
    }, 
    /** Compare by ID then by key */ t.Zu = function(t, e) {
        return Pe(t.hc, e.hc) || L.N(t.key, e.key);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Validates that no arguments were passed in the invocation of functionName.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateNoArgs('myFunction', arguments);
 */
function vr(t, e) {
    if (0 !== e.length) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() does not support arguments, but was called with " + Or(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has the exact number of arguments.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateExactNumberOfArgs('myFunction', arguments, 2);
 */ function mr(t, e, n) {
    if (e.length !== n) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires " + Or(n, "argument") + ", but was called with " + Or(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has at least the provided number of
 * arguments (but can have many more).
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
 */ function gr(t, e, n) {
    if (e.length < n) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires at least " + Or(n, "argument") + ", but was called with " + Or(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has number of arguments between
 * the values provided.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateBetweenNumberOfArgs('myFunction', arguments, 2, 3);
 */ function wr(t, e, n, r) {
    if (e.length < n || e.length > r) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires between " + n + " and " + r + " arguments, but was called with " + Or(e.length, "argument") + ".");
}

/**
 * Validates the provided argument is an array and has as least the expected
 * number of elements.
 */
/**
 * Validates the provided positional argument has the native JavaScript type
 * using typeof checks.
 */ function Er(t, e, n, r) {
    Ar(t, e, Rr(n) + " argument", r);
}

/**
 * Validates the provided argument has the native JavaScript type using
 * typeof checks or is undefined.
 */ function br(t, e, n, r) {
    void 0 !== r && Er(t, e, n, r);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks.
 */ function Tr(t, e, n, r) {
    Ar(t, e, n + " option", r);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks or is undefined.
 */ function Ir(t, e, n, r) {
    void 0 !== r && Tr(t, e, n, r);
}

/**
 * Validates that the provided named option equals one of the expected values.
 */
/**
 * Validates that the provided named option equals one of the expected values or
 * is undefined.
 */
function Nr(t, e, n, r, i) {
    void 0 !== r && function(t, e, n, r, i) {
        for (var o = [], s = 0, u = i; s < u.length; s++) {
            var a = u[s];
            if (a === r) return;
            o.push(Dr(a));
        }
        var h = Dr(r);
        throw new I(T.INVALID_ARGUMENT, "Invalid value " + h + " provided to function " + t + '() for option "' + n + '". Acceptable values: ' + o.join(", "));
    }(t, 0, n, r, i);
}

/**
 * Validates that the provided argument is a valid enum.
 *
 * @param functionName Function making the validation call.
 * @param enums Array containing all possible values for the enum.
 * @param position Position of the argument in `functionName`.
 * @param argument Argument to validate.
 * @return The value as T if the argument can be converted.
 */
/** Helper to validate the type of a provided input. */ function Ar(t, e, n, r) {
    if (!("object" === e ? _r(r) : "non-empty string" === e ? "string" == typeof r && "" !== r : typeof r === e)) {
        var i = Dr(r);
        throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " to be of type " + e + ", but it was: " + i);
    }
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */ function _r(t) {
    return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
}

/** Returns a string describing the type / value of the provided input. */ function Dr(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        var e = 
        /** Hacky method to try to get the constructor name for an object. */
        function(t) {
            if (t.constructor) {
                var e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                if (e && e.length > 1) return e[1];
            }
            return null;
        }(t);
        return e ? "a custom " + e + " object" : "an object";
    }
    return "function" == typeof t ? "a function" : xe();
}

function kr(t, e, n) {
    if (void 0 === n) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires a valid " + Rr(e) + " argument, but it was undefined.");
}

/**
 * Validates the provided positional argument is an object, and its keys and
 * values match the expected keys and types provided in optionTypes.
 */ function Sr(t, e, n) {
    q(e, (function(e, r) {
        if (n.indexOf(e) < 0) throw new I(T.INVALID_ARGUMENT, "Unknown option '" + e + "' passed to function " + t + "(). Available options: " + n.join(", "));
    }));
}

/**
 * Helper method to throw an error that the provided argument did not pass
 * an instanceof check.
 */ function xr(t, e, n, r) {
    var i = Dr(r);
    return new I(T.INVALID_ARGUMENT, "Function " + t + "() requires its " + Rr(n) + " argument to be a " + e + ", but it was: " + i);
}

function Vr(t, e, n) {
    if (n <= 0) throw new I(T.INVALID_ARGUMENT, 'Function "' + t + '()" requires its ' + Rr(e) + " argument to be a positive number, but it was: " + n + ".");
}

/** Converts a number to its english word representation */ function Rr(t) {
    switch (t) {
      case 1:
        return "first";

      case 2:
        return "second";

      case 3:
        return "third";

      default:
        return t + "th";
    }
}

/**
 * Formats the given word as plural conditionally given the preceding number.
 */ function Or(t, e) {
    return t + " " + e + (1 === t ? "" : "s");
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Helper function to assert Uint8Array is available at runtime. */ function Pr() {
    if ("undefined" == typeof Uint8Array) throw new I(T.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function Lr() {
    if (!Ie.nt().oc) throw new I(T.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}

/**
 * Immutable class holding a blob (binary data).
 * This class is directly exposed in the public API.
 *
 * Note that while you can't hide the constructor in JavaScript code, we are
 * using the hack above to make sure no-one outside this module can call it.
 */ var Ur = /** @class */ function() {
    function t(t) {
        Lr(), this.ac = t;
    }
    return t.fromBase64String = function(e) {
        mr("Blob.fromBase64String", arguments, 1), Er("Blob.fromBase64String", "string", 1, e), 
        Lr();
        try {
            return new t(C.fromBase64String(e));
        } catch (e) {
            throw new I(T.INVALID_ARGUMENT, "Failed to construct Blob from Base64 string: " + e);
        }
    }, t.fromUint8Array = function(e) {
        if (mr("Blob.fromUint8Array", arguments, 1), Pr(), !(e instanceof Uint8Array)) throw xr("Blob.fromUint8Array", "Uint8Array", 1, e);
        return new t(C.fromUint8Array(e));
    }, t.prototype.toBase64 = function() {
        return mr("Blob.toBase64", arguments, 0), Lr(), this.ac.toBase64();
    }, t.prototype.toUint8Array = function() {
        return mr("Blob.toUint8Array", arguments, 0), Pr(), this.ac.toUint8Array();
    }, t.prototype.toString = function() {
        return "Blob(base64: " + this.toBase64() + ")";
    }, t.prototype.isEqual = function(t) {
        return this.ac.isEqual(t.ac);
    }, t;
}(), qr = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        !function(t, e, n, r) {
            if (!(e instanceof Array) || e.length < 1) throw new I(T.INVALID_ARGUMENT, "Function FieldPath() requires its fieldNames argument to be an array with at least " + Or(1, "element") + ".");
        }(0, t);
        for (var n = 0; n < t.length; ++n) if (Er("FieldPath", "string", n, t[n]), 0 === t[n].length) throw new I(T.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this.uc = new P(t);
    }
    return t.documentId = function() {
        return t.cc;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw xr("isEqual", "FieldPath", 1, e);
        return this.uc.isEqual(e.uc);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The objects that are a part of this API are exposed to third-parties as
// compiled javascript so we want to flag our private members with a leading
// underscore to discourage their use.
/**
 * A FieldPath refers to a field in a document. The path may consist of a single
 * field name (referring to a top-level field in the document), or a list of
 * field names (referring to a nested field in the document).
 */
/**
 * Internal Note: The backend doesn't technically support querying by
 * document ID. Instead it queries by the entire document name (full path
 * included), but in the cases we currently support documentId(), the net
 * effect is the same.
 */
qr.cc = new qr(P.J().j());

/**
 * Matches any characters in a field path string that are reserved.
 */
var Mr = new RegExp("[~\\*/\\[\\]]"), Cr = function(t) {
    this._c = t;
}, Fr = /** @class */ function(e) {
    function n() {
        return e.call(this, "FieldValue.delete") || this;
    }
    return t(n, e), n.prototype.Di = function(t) {
        if (2 /* MergeSet */ !== t.lc) throw 1 /* Update */ === t.lc ? t.dc("FieldValue.delete() can only appear at the top level of your update data") : t.dc("FieldValue.delete() cannot be used with set() unless you pass {merge:true}");
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
                return t.Vt.push(t.path), null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Cr), jr = /** @class */ function(e) {
    function n() {
        return e.call(this, "FieldValue.serverTimestamp") || this;
    }
    return t(n, e), n.prototype.Di = function(t) {
        return new pt(t.path, ut.instance);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(Cr), Br = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, "FieldValue.arrayUnion") || this).fc = t, n;
    }
    return t(n, e), n.prototype.Di = function(t) {
        // Although array transforms are used with writes, the actual elements
        // being uniomed or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        var e = new Xr({
            lc: 3 /* Argument */ ,
            methodName: this._c,
            Tc: !0
        }, t.ii, t.serializer), n = this.fc.map((function(t) {
            return Zr(t, e);
        })), r = new at(n);
        return new pt(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Cr), Gr = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, "FieldValue.arrayRemove") || this).fc = t, n;
    }
    return t(n, e), n.prototype.Di = function(t) {
        // Although array transforms are used with writes, the actual elements
        // being unioned or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        var e = new Xr({
            lc: 3 /* Argument */ ,
            methodName: this._c,
            Tc: !0
        }, t.ii, t.serializer), n = this.fc.map((function(t) {
            return Zr(t, e);
        })), r = new ht(n);
        return new pt(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Cr), zr = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this, "FieldValue.increment") || this).Ec = t, n;
    }
    return t(n, e), n.prototype.Di = function(t) {
        var e = new Xr({
            lc: 3 /* Argument */ ,
            methodName: this._c
        }, t.ii, t.serializer), n = Zr(this.Ec, e), r = new ct(t.serializer, n);
        return new pt(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(Cr), Qr = /** @class */ function() {
    function t(t, e) {
        if (mr("GeoPoint", arguments, 2), Er("GeoPoint", "number", 1, t), Er("GeoPoint", "number", 2, e), 
        !isFinite(t) || t < -90 || t > 90) throw new I(T.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new I(T.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this.Ic = t, this.wc = e;
    }
    return Object.defineProperty(t.prototype, "latitude", {
        /**
         * Returns the latitude of this geo point, a number between -90 and 90.
         */
        get: function() {
            return this.Ic;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "longitude", {
        /**
         * Returns the longitude of this geo point, a number between -180 and 180.
         */
        get: function() {
            return this.wc;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        return this.Ic === t.Ic && this.wc === t.wc;
    }, 
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t.prototype.p = function(t) {
        return Pe(this.Ic, t.Ic) || Pe(this.wc, t.wc);
    }, t;
}(), Wr = /^__.*__$/, Kr = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.Vt = e, this.fieldTransforms = n;
    }
    return t.prototype.Rc = function(t, e) {
        var n = [];
        return null !== this.Vt ? n.push(new gt(t, this.data, this.Vt, e)) : n.push(new mt(t, this.data, e)), 
        this.fieldTransforms.length > 0 && n.push(new wt(t, this.fieldTransforms)), n;
    }, t;
}(), Yr = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.Vt = e, this.fieldTransforms = n;
    }
    return t.prototype.Rc = function(t, e) {
        var n = [ new gt(t, this.data, this.Vt, e) ];
        return this.fieldTransforms.length > 0 && n.push(new wt(t, this.fieldTransforms)), 
        n;
    }, t;
}();

/**
 * Parses a field path string into a FieldPath, treating dots as separators.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An opaque base class for FieldValue sentinel objects in our public API,
 * with public static methods for creating said sentinel objects.
 */ function Hr(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw xe();
    }
}

/** A "context" object passed around while parsing user data. */ var Xr = /** @class */ function() {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings The settings for the parser.
     * @param databaseId The database ID of the Firestore instance.
     * @param serializer The serializer to use to generate the Value proto.
     * @param fieldTransforms A mutable list of field transforms encountered while
     *     parsing the data.
     * @param fieldMask A mutable list of field paths encountered while parsing
     *     the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    function t(t, e, n, r, i) {
        this.settings = t, this.ii = e, this.serializer = n, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === r && this.Ac(), this.fieldTransforms = r || [], this.Vt = i || [];
    }
    return Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.settings.path;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "lc", {
        get: function() {
            return this.settings.lc;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Returns a new context with the specified settings overwritten. */ t.prototype.mc = function(e) {
        return new t(Object.assign(Object.assign({}, this.settings), e), this.ii, this.serializer, this.fieldTransforms, this.Vt);
    }, t.prototype.Pc = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.mc({
            path: n,
            Tc: !1
        });
        return r.Vc(t), r;
    }, t.prototype.gc = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.mc({
            path: n,
            Tc: !1
        });
        return r.Ac(), r;
    }, t.prototype.pc = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.mc({
            path: void 0,
            Tc: !0
        });
    }, t.prototype.dc = function(t) {
        var e = !this.path || this.path.B() ? "" : " (found in field " + this.path.toString() + ")";
        return new I(T.INVALID_ARGUMENT, "Function " + this.settings.methodName + "() called with invalid data. " + t + e);
    }, 
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ t.prototype.contains = function(t) {
        return void 0 !== this.Vt.find((function(e) {
            return t.q(e);
        })) || void 0 !== this.fieldTransforms.find((function(e) {
            return t.q(e.field);
        }));
    }, t.prototype.Ac = function() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (var t = 0; t < this.path.length; t++) this.Vc(this.path.get(t));
    }, t.prototype.Vc = function(t) {
        if (0 === t.length) throw this.dc("Document fields must not be empty");
        if (Hr(this.lc) && Wr.test(t)) throw this.dc('Document fields cannot begin and end with "__"');
    }, t;
}(), $r = /** @class */ function() {
    function t(t, e) {
        this.ii = t, this.serializer = e || Ie.nt().yc(t)
        /** Parse document data from a non-merge set() call. */;
    }
    return t.prototype.bc = function(t, e) {
        var n = this.vc(0 /* Set */ , t);
        ei("Data must be an object, but it was:", n, e);
        var r = Jr(e, n);
        return new Kr(new Tt(r), 
        /* fieldMask= */ null, n.fieldTransforms);
    }, 
    /** Parse document data from a set() call with '{merge:true}'. */ t.prototype.Sc = function(t, e, n) {
        var r = this.vc(2 /* MergeSet */ , t);
        ei("Data must be an object, but it was:", r, e);
        var i, o, s = Jr(e, r);
        if (n) {
            for (var u = [], a = 0, h = n; a < h.length; a++) {
                var c = h[a], f = void 0;
                if (c instanceof qr) f = c.uc; else {
                    if ("string" != typeof c) throw xe();
                    f = ri(t, c);
                }
                if (!r.contains(f)) throw new I(T.INVALID_ARGUMENT, "Field '" + f + "' is specified in your field mask but missing from your input data.");
                ii(u, f) || u.push(f);
            }
            i = new lt(u), o = r.fieldTransforms.filter((function(t) {
                return i.dt(t.field);
            }));
        } else i = new lt(r.Vt), o = r.fieldTransforms;
        return new Kr(new Tt(s), i, o);
    }, 
    /** Parse update data from an update() call. */ t.prototype.Dc = function(t, e) {
        var n = this.vc(1 /* Update */ , t);
        ei("Data must be an object, but it was:", n, e);
        var r = [], i = new It;
        q(e, (function(e, o) {
            var s = ri(t, e), u = n.gc(s);
            if (o instanceof Fr) 
            // Add it to the field mask, but don't add anything to updateData.
            r.push(s); else {
                var a = Zr(o, u);
                null != a && (r.push(s), i.set(s, a));
            }
        }));
        var o = new lt(r);
        return new Yr(i.yt(), o, n.fieldTransforms);
    }, 
    /** Parse update data from a list of field/value arguments. */ t.prototype.Cc = function(t, e, n, r) {
        var i = this.vc(1 /* Update */ , t), o = [ ni(t, e) ], s = [ n ];
        if (r.length % 2 != 0) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() needs to be called with an even number of arguments that alternate between field names and values.");
        for (var u = 0; u < r.length; u += 2) o.push(ni(t, r[u])), s.push(r[u + 1]);
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (var a = [], h = new It, c = o.length - 1; c >= 0; --c) if (!ii(a, o[c])) {
            var f = o[c], l = s[c], p = i.gc(f);
            if (l instanceof Fr) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(f); else {
                var d = Zr(l, p);
                null != d && (a.push(f), h.set(f, d));
            }
        }
        var y = new lt(a);
        return new Yr(h.yt(), y, i.fieldTransforms);
    }, 
    /** Creates a new top-level parse context. */ t.prototype.vc = function(t, e) {
        return new Xr({
            lc: t,
            methodName: e,
            path: P.G,
            Tc: !1
        }, this.ii, this.serializer);
    }, 
    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */
    t.prototype.Fc = function(t, e, n) {
        return void 0 === n && (n = !1), Zr(e, this.vc(n ? 4 /* ArrayArgument */ : 3 /* Argument */ , t));
    }, t;
}();

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */
/**
 * Parses user data to Protobuf Values.
 *
 * @param input Data to be parsed.
 * @param context A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @return The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */
function Zr(t, e) {
    if (ti(t)) return ei("Unsupported field value:", e, t), Jr(t, e);
    if (t instanceof Cr) 
    // FieldValues usually parse into transforms (except FieldValue.delete())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!Hr(e.lc)) throw e.dc(t._c + "() can only be used with update() and set()");
        if (null === e.path) throw e.dc(t._c + "() is not currently supported inside arrays");
        var n = t.Di(e);
        n && e.fieldTransforms.push(n);
    }(t, e), null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.Vt.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.Tc && 4 /* ArrayArgument */ !== e.lc) throw e.dc("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var s = Zr(o[i], e.pc(r));
                null == s && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                s = {
                    nullValue: "NULL_VALUE"
                }), n.push(s), r++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === t) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return e.serializer.ai(t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            var n = S.fromDate(t);
            return {
                timestampValue: e.serializer.C(n)
            };
        }
        if (t instanceof S) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            var r = new S(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: e.serializer.C(r)
            };
        }
        if (t instanceof Qr) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof Ur) return {
            bytesValue: e.serializer.ui(t)
        };
        if (t instanceof $i) {
            var i = e.ii, o = t.firestore.Nc;
            if (!o.isEqual(i)) throw e.dc("Document reference is for database " + o.projectId + "/" + o.database + " but should be for database " + i.projectId + "/" + i.database);
            return {
                referenceValue: e.serializer._i(t.kc.path, t.firestore.Nc)
            };
        }
        throw e.dc("Unsupported field value: " + Dr(t));
    }(t, e);
}

function Jr(t, e) {
    var n = {};
    return M(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.Vt.push(e.path) : q(t, (function(t, r) {
        var i = Zr(r, e.Pc(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function ti(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof S || t instanceof Qr || t instanceof Ur || t instanceof $i || t instanceof Cr);
}

function ei(t, e, n) {
    if (!ti(n) || !_r(n)) {
        var r = Dr(n);
        throw "an object" === r ? e.dc(t + " a custom object") : e.dc(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function ni(t, e) {
    if (e instanceof qr) return e.uc;
    if ("string" == typeof e) return ri(t, e);
    throw new I(T.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. Field path arguments must be of type string or FieldPath.");
}

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName The publicly visible method name
 * @param path The dot-separated string form of a field path which will be split
 * on dots.
 */ function ri(t, e) {
    try {
        return function(t) {
            if (t.search(Mr) >= 0) throw new I(T.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not contain '~', '*', '/', '[', or ']'");
            try {
                return new (qr.bind.apply(qr, r([ void 0 ], t.split("."))));
            } catch (e) {
                throw new I(T.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            }
        }(e).uc;
    } catch (e) {
        var n = (i = e) instanceof Error ? i.message : i.toString();
        throw new I(T.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. " + n);
    }
    /**
 * Extracts the message from a caught exception, which should be an Error object
 * though JS doesn't guarantee that.
 */    var i;
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

function ii(t, e) {
    return t.some((function(t) {
        return t.isEqual(e);
    }));
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */ var oi = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.Tr = t, this.$c = n, this.Mc = r, this.Lc = i, this.listener = o, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.Oc = 0, this.xc = null, this.stream = null, this.Qr = new Xe(t, e)
        /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */;
    }
    return t.prototype.Bc = function() {
        return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
    }, 
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t.prototype.qc = function() {
        return 2 /* Open */ === this.state;
    }, 
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */
    t.prototype.start = function() {
        3 /* Error */ !== this.state ? this.auth() : this.Uc();
    }, 
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t.prototype.stop = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.Bc() ? [ 4 /*yield*/ , this.close(0 /* Initial */) ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */
    t.prototype.Qc = function() {
        this.state = 0 /* Initial */ , this.Qr.reset();
    }, 
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */
    t.prototype.Wc = function() {
        var t = this;
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
                this.qc() && null === this.xc && (this.xc = this.Tr.yr(this.$c, 6e4, (function() {
            return t.jc();
        })));
    }, 
    /** Sends a message to the underlying stream. */ t.prototype.Kc = function(t) {
        this.Gc(), this.stream.send(t);
    }, 
    /** Called by the idle timer when the stream should close due to inactivity. */ t.prototype.jc = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return this.qc() ? [ 2 /*return*/ , this.close(0 /* Initial */) ] : [ 2 /*return*/ ];
            }));
        }));
    }, 
    /** Marks the stream as active again. */ t.prototype.Gc = function() {
        this.xc && (this.xc.cancel(), this.xc = null);
    }, 
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState the intended state of the stream after closing.
     * @param error the error the connection was closed with.
     */
    t.prototype.close = function(t, r) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.Gc(), this.Qr.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.Oc++, 3 /* Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.Qr.reset() : r && r.code === T.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    ke(r.toString()), ke("Using maximum backoff delay to prevent overloading the backend."), 
                    this.Qr.Vr()) : r && r.code === T.UNAUTHENTICATED && 
                    // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
                    // just expired.
                    this.Lc._(), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.zc(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.Hc(r) ];

                  case 1:
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    // Notify the listener that the stream closed.
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */
    t.prototype.zc = function() {}, t.prototype.auth = function() {
        var t = this;
        this.state = 1 /* Starting */;
        var e = this.Yc(this.Oc), n = this.Oc;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                this.Lc.getToken().then((function(e) {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            t.Oc === n && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            t.Jc(e);
        }), (function(n) {
            e((function() {
                var e = new I(T.UNKNOWN, "Fetching auth token failed: " + n.message);
                return t.Xc(e);
            }));
        }));
    }, t.prototype.Jc = function(t) {
        var e = this, n = this.Yc(this.Oc);
        this.stream = this.Zc(t), this.stream.t_((function() {
            n((function() {
                return e.state = 2 /* Open */ , e.listener.t_();
            }));
        })), this.stream.Hc((function(t) {
            n((function() {
                return e.Xc(t);
            }));
        })), this.stream.onMessage((function(t) {
            n((function() {
                return e.onMessage(t);
            }));
        }));
    }, t.prototype.Uc = function() {
        var t = this;
        this.state = 4 /* Backoff */ , this.Qr.gr((function() {
            return e(t, void 0, void 0, (function() {
                return n(this, (function(t) {
                    return this.state = 0 /* Initial */ , this.start(), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, 
    // Visible for tests
    t.prototype.Xc = function(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return De("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
    }, 
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t.prototype.Yc = function(t) {
        var e = this;
        return function(n) {
            e.Tr.$r((function() {
                return e.Oc === t ? n() : (De("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), si = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        var s = this;
        return (s = e.call(this, t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , n, r, o) || this).serializer = i, 
        s;
    }
    return t(n, e), n.prototype.Zc = function(t) {
        return this.Mc.e_("Listen", t);
    }, n.prototype.onMessage = function(t) {
        // A successful response means the stream is healthy
        this.Qr.reset();
        var e = this.serializer.pi(t), n = this.serializer.bi(t);
        return this.listener.s_(e, n);
    }, 
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.i_ = function(t) {
        var e = {};
        e.database = this.serializer.wi, e.addTarget = this.serializer.ee(t);
        var n = this.serializer.zi(t);
        n && (e.labels = n), this.Kc(e);
    }, 
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.n_ = function(t) {
        var e = {};
        e.database = this.serializer.wi, e.removeTarget = t, this.Kc(e);
    }, n;
}(oi), ui = /** @class */ function(e) {
    function n(t, n, r, i, o) {
        var s = this;
        return (s = e.call(this, t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , n, r, o) || this).serializer = i, 
        s.r_ = !1, 
        /**
             * The last received stream token from the server, used to acknowledge which
             * responses the client has processed. Stream tokens are opaque checkpoint
             * markers whose only real value is their inclusion in the next request.
             *
             * PersistentWriteStream manages propagating this value from responses to the
             * next request.
             */
        s.lastStreamToken = C.ht, s;
    }
    return t(n, e), Object.defineProperty(n.prototype, "h_", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.r_;
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.r_ = !1, e.prototype.start.call(this);
    }, n.prototype.zc = function() {
        this.r_ && this.o_([]);
    }, n.prototype.Zc = function(t) {
        return this.Mc.e_("Write", t);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        Ve(!!t.streamToken), this.lastStreamToken = this.serializer.ci(t.streamToken), this.r_) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Qr.reset();
            var e = this.serializer.Li(t.writeResults, t.commitTime), n = this.serializer.fromVersion(t.commitTime);
            return this.listener.a_(n, e);
        }
        // The first response is always the handshake response
                return Ve(!t.writeResults || 0 === t.writeResults.length), this.r_ = !0, 
        this.listener.u_();
    }, 
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.c_ = function() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        var t = {};
        t.database = this.serializer.wi, this.Kc(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.o_ = function(t) {
        var e = this, n = {
            streamToken: this.serializer.ui(this.lastStreamToken),
            writes: t.map((function(t) {
                return e.serializer.vi(t);
            }))
        };
        this.Kc(n);
    }, n;
}(oi), ai = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        return (i = e.call(this) || this).Mc = t, i.credentials = n, i.serializer = r, i;
    }
    /** Gets an auth token and invokes the provided RPC. */    return t(n, e), n.prototype.l_ = function(t, e) {
        var n = this;
        return this.credentials.getToken().then((function(r) {
            return n.Mc.l_(t, e, r);
        })).catch((function(t) {
            throw t.code === T.UNAUTHENTICATED && n.credentials._(), t;
        }));
    }, 
    /** Gets an auth token and invokes the provided RPC with streamed results. */ n.prototype.d_ = function(t, e) {
        var n = this;
        return this.credentials.getToken().then((function(r) {
            return n.Mc.d_(t, e, r);
        })).catch((function(t) {
            throw t.code === T.UNAUTHENTICATED && n.credentials._(), t;
        }));
    }, n;
}((function() {
    // Make sure that the structural type of `Datastore` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this.__ = void 0;
})), hi = /** @class */ function() {
    function t(t) {
        this.f_ = t, 
        // The version of each document that was read during this transaction.
        this.T_ = ne(), this.mutations = [], this.E_ = !1, 
        /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
        this.I_ = null, 
        /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
        this.w_ = new Set;
    }
    return t.prototype.R_ = function(t) {
        return e(this, void 0, void 0, (function() {
            var r, i = this;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    if (this.A_(), this.mutations.length > 0) throw new I(T.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o, s, u;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = Re(t), i = {
                                        database: e.serializer.wi,
                                        documents: r.map((function(t) {
                                            return e.serializer.fi(t);
                                        }))
                                    }, [ 4 /*yield*/ , e.d_("BatchGetDocuments", i) ];

                                  case 1:
                                    return o = n.sent(), s = new Map, o.forEach((function(t) {
                                        var n = e.serializer.gi(t);
                                        s.set(n.key.toString(), n);
                                    })), u = [], [ 2 /*return*/ , (r.forEach((function(t) {
                                        var e = s.get(t.toString());
                                        Ve(!!e), u.push(e);
                                    })), u) ];
                                }
                            }));
                        }));
                    }(this.f_, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((r = o.sent()).forEach((function(t) {
                        t instanceof St || t instanceof kt ? i.m_(t) : xe();
                    })), r) ];
                }
            }));
        }));
    }, t.prototype.set = function(t, e) {
        this.write(e.Rc(t, this.Rt(t))), this.w_.add(t);
    }, t.prototype.update = function(t, e) {
        try {
            this.write(e.Rc(t, this.P_(t)));
        } catch (t) {
            this.I_ = t;
        }
        this.w_.add(t);
    }, t.prototype.delete = function(t) {
        this.write([ new Et(t, this.Rt(t)) ]), this.w_.add(t);
    }, t.prototype.commit = function() {
        return e(this, void 0, void 0, (function() {
            var t, r = this;
            return n(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (this.A_(), this.I_) throw this.I_;
                    return t = this.T_, 
                    // For each mutation, note that the doc was written.
                    this.mutations.forEach((function(e) {
                        t = t.remove(e.key);
                    })), 
                    // For each document that was read but not written to, we want to perform
                    // a `verify` operation.
                    t.forEach((function(t, e) {
                        r.mutations.push(new bt(t, r.Rt(t)));
                    })), [ 4 /*yield*/ , function(t, r) {
                        return e(this, void 0, void 0, (function() {
                            var e, i, o;
                            return n(this, (function(n) {
                                switch (n.label) {
                                  case 0:
                                    return e = Re(t), i = {
                                        database: e.serializer.wi,
                                        writes: r.map((function(t) {
                                            return e.serializer.vi(t);
                                        }))
                                    }, [ 4 /*yield*/ , e.l_("Commit", i) ];

                                  case 1:
                                    return o = n.sent(), [ 2 /*return*/ , e.serializer.Li(o.writeResults, o.commitTime) ];
                                }
                            }));
                        }));
                    }(this.f_, this.mutations) ];

                  case 1:
                    // For each mutation, note that the doc was written.
                    return i.sent(), this.E_ = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.m_ = function(t) {
        var e;
        if (t instanceof kt) e = t.version; else {
            if (!(t instanceof St)) throw xe();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = x.min();
        }
        var n = this.T_.get(t.key);
        if (null !== n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new I(T.ABORTED, "Document version changed between two reads.");
        } else this.T_ = this.T_.Ae(t.key, e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.Rt = function(t) {
        var e = this.T_.get(t);
        return !this.w_.has(t) && e ? yt.updateTime(e) : yt.ft();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.P_ = function(t) {
        var e = this.T_.get(t);
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.w_.has(t) && e) {
            if (e.isEqual(x.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new I(T.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return yt.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return yt.exists(!0);
    }, t.prototype.write = function(t) {
        this.A_(), this.mutations = this.mutations.concat(t);
    }, t.prototype.A_ = function() {}, t;
}(), ci = /** @class */ function() {
    function t(t, e) {
        this.br = t, this.V_ = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.g_ = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.p_ = null, 
        /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
        this.y_ = !0
        /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */;
    }
    return t.prototype.b_ = function() {
        var t = this;
        0 === this.g_ && (this.v_("Unknown" /* Unknown */), this.p_ = this.br.yr("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (function() {
            return t.p_ = null, t.S_("Backend didn't respond within 10 seconds."), t.v_("Offline" /* Offline */), 
            Promise.resolve();
        })));
    }, 
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t.prototype.D_ = function(t) {
        "Online" /* Online */ === this.state ? this.v_("Unknown" /* Unknown */) : (this.g_++, 
        this.g_ >= 1 && (this.C_(), this.S_("Connection failed 1 times. Most recent error: " + t.toString()), 
        this.v_("Offline" /* Offline */)));
    }, 
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t.prototype.set = function(t) {
        this.C_(), this.g_ = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.y_ = !1), this.v_(t);
    }, t.prototype.v_ = function(t) {
        t !== this.state && (this.state = t, this.V_(t));
    }, t.prototype.S_ = function(t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.y_ ? (ke(e), this.y_ = !1) : De("OnlineStateTracker", e);
    }, t.prototype.C_ = function() {
        null !== this.p_ && (this.p_.cancel(), this.p_ = null);
    }, t;
}(), fi = /** @class */ function() {
    function t(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    t, 
    /** The client-side proxy for interacting with the backend. */
    r, i, o, s) {
        var u = this;
        this.F_ = t, this.f_ = r, this.br = i, 
        /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
        this.N_ = [], 
        /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
        this.k_ = new Map, this.M_ = null, 
        /**
             * Set to true by enableNetwork() and false by disableNetwork() and indicates
             * the user-preferred network state.
             */
        this.networkEnabled = !1, this.isPrimary = !1, 
        /**
             * When set to `true`, the network was taken offline due to an IndexedDB
             * failure. The state is flipped to `false` when access becomes available
             * again.
             */
        this.L_ = !1, this.O_ = s, this.O_.x_((function(t) {
            i.$r((function() {
                return e(u, void 0, void 0, (function() {
                    return n(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            return this.B_() ? (De("RemoteStore", "Restarting streams for network reachability change."), 
                            [ 4 /*yield*/ , this.q_() ]) : [ 3 /*break*/ , 2 ];

                          case 1:
                            t.sent(), t.label = 2;

                          case 2:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        })), this.U_ = new ci(i, o), 
        // Create streams (but note they're not started yet).
        this.Q_ = function(t, e, n) {
            var r = Re(t);
            return new si(e, r.Mc, r.credentials, r.serializer, n);
        }(this.f_, i, {
            t_: this.W_.bind(this),
            Hc: this.j_.bind(this),
            s_: this.K_.bind(this)
        }), this.G_ = function(t, e, n) {
            var r = Re(t);
            return new ui(e, r.Mc, r.credentials, r.serializer, n);
        }(this.f_, i, {
            t_: this.z_.bind(this),
            Hc: this.H_.bind(this),
            u_: this.Y_.bind(this),
            a_: this.a_.bind(this)
        });
    }
    /**
     * Starts up the remote store, creating streams, restoring state from
     * LocalStore, etc.
     */    return t.prototype.start = function() {
        return this.enableNetwork();
    }, 
    /** Re-enables the network. Idempotent. */ t.prototype.enableNetwork = function() {
        return this.networkEnabled = !0, this.J_();
    }, t.prototype.J_ = function() {
        return e(this, void 0, void 0, (function() {
            var t;
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.B_() ? (t = this.G_, [ 4 /*yield*/ , this.F_.do() ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return t.lastStreamToken = e.sent(), this.X_() ? this.Z_() : this.U_.set("Unknown" /* Unknown */), 
                    [ 4 /*yield*/ , this.tl() ];

                  case 2:
                    // This will start the write stream if necessary.
                    e.sent(), e.label = 3;

                  case 3:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */
    t.prototype.disableNetwork = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.networkEnabled = !1, [ 4 /*yield*/ , this.el() ];

                  case 1:
                    return t.sent(), 
                    // Set the OnlineState to Offline so get()s return from cache, etc.
                    this.U_.set("Offline" /* Offline */), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.el = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.G_.stop() ];

                  case 1:
                    return t.sent(), [ 4 /*yield*/ , this.Q_.stop() ];

                  case 2:
                    return t.sent(), this.N_.length > 0 && (De("RemoteStore", "Stopping write stream with " + this.N_.length + " pending writes"), 
                    this.N_ = []), this.sl(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.hu = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return De("RemoteStore", "RemoteStore shutting down."), this.networkEnabled = !1, 
                    [ 4 /*yield*/ , this.el() ];

                  case 1:
                    return t.sent(), this.O_.hu(), 
                    // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                    // triggering spurious listener events with cached data, etc.
                    this.U_.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */
    t.prototype.listen = function(t) {
        this.k_.has(t.targetId) || (
        // Mark this as something the client is currently listening for.
        this.k_.set(t.targetId, t), this.X_() ? 
        // The listen will be sent in onWatchStreamOpen
        this.Z_() : this.Q_.qc() && this.il(t));
    }, 
    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */
    t.prototype.nl = function(t) {
        this.k_.delete(t), this.Q_.qc() && this.rl(t), 0 === this.k_.size && (this.Q_.qc() ? this.Q_.Wc() : this.B_() && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        this.U_.set("Unknown" /* Unknown */));
    }, 
    /** {@link TargetMetadataProvider.getTargetDataForTarget} */ t.prototype.si = function(t) {
        return this.k_.get(t) || null;
    }, 
    /** {@link TargetMetadataProvider.getRemoteKeysForTarget} */ t.prototype.ei = function(t) {
        return this.hl.ei(t);
    }, 
    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */
    t.prototype.il = function(t) {
        this.M_.Ns(t.targetId), this.Q_.i_(t);
    }, 
    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */
    t.prototype.rl = function(t) {
        this.M_.Ns(t), this.Q_.n_(t);
    }, t.prototype.Z_ = function() {
        this.M_ = new ve(this), this.Q_.start(), this.U_.b_();
    }, 
    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */
    t.prototype.X_ = function() {
        return this.B_() && !this.Q_.Bc() && this.k_.size > 0;
    }, t.prototype.B_ = function() {
        return !this.L_ && this.isPrimary && this.networkEnabled;
    }, t.prototype.sl = function() {
        this.M_ = null;
    }, t.prototype.W_ = function() {
        return e(this, void 0, void 0, (function() {
            var t = this;
            return n(this, (function(e) {
                return this.k_.forEach((function(e, n) {
                    t.il(e);
                })), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.j_ = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                return this.sl(), 
                // If we still need the watch stream, retry the connection.
                this.X_() ? (this.U_.D_(t), this.Z_()) : 
                // No need to restart watch stream because there are no active targets.
                // The online state is set to unknown because there is no active attempt
                // at establishing a connection
                this.U_.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.K_ = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e, i, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    if (this.U_.set("Online" /* Online */), !(t instanceof de && 2 /* Removed */ === t.state && t.cause)) 
                    // Mark the client as online since we got a message from the server
                    return [ 3 /*break*/ , 6 ];
                    n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , this.ol(t) ];

                  case 2:
                    return n.sent(), [ 3 /*break*/ , 5 ];

                  case 3:
                    return e = n.sent(), De("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), e), 
                    [ 4 /*yield*/ , this.al(e) ];

                  case 4:
                    return n.sent(), [ 3 /*break*/ , 5 ];

                  case 5:
                    return [ 3 /*break*/ , 13 ];

                  case 6:
                    if (t instanceof le ? this.M_.qs(t) : t instanceof pe ? this.M_.Hs(t) : this.M_.Ws(t), 
                    r.isEqual(x.min())) return [ 3 /*break*/ , 13 ];
                    n.label = 7;

                  case 7:
                    return n.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , this.F_.Oo() ];

                  case 8:
                    return i = n.sent(), r.S(i) >= 0 ? [ 4 /*yield*/ , this.ul(r) ] : [ 3 /*break*/ , 10 ];

                    // We have received a target change with a global snapshot if the snapshot
                    // version is not equal to SnapshotVersion.min().
                                      case 9:
                    // We have received a target change with a global snapshot if the snapshot
                    // version is not equal to SnapshotVersion.min().
                    n.sent(), n.label = 10;

                  case 10:
                    return [ 3 /*break*/ , 13 ];

                  case 11:
                    return De("RemoteStore", "Failed to raise snapshot:", o = n.sent()), [ 4 /*yield*/ , this.al(o) ];

                  case 12:
                    return n.sent(), [ 3 /*break*/ , 13 ];

                  case 13:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Recovery logic for IndexedDB errors that takes the network offline until
     * IndexedDb probing succeeds. Retries are scheduled with backoff using
     * `enqueueRetryable()`.
     */
    t.prototype.al = function(t) {
        return e(this, void 0, void 0, (function() {
            var r = this;
            return n(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if ("IndexedDbTransactionError" !== t.name) throw t;
                    // Disable network and raise offline snapshots
                    return this.L_ = !0, [ 4 /*yield*/ , this.el() ];

                  case 1:
                    // Disable network and raise offline snapshots
                    return i.sent(), this.U_.set("Offline" /* Offline */), 
                    // Probe IndexedDB periodically and re-enable network
                    this.br.Xr((function() {
                        return e(r, void 0, void 0, (function() {
                            return n(this, (function(t) {
                                switch (t.label) {
                                  case 0:
                                    // Issue a simple read operation to determine if IndexedDB recovered.
                                    // Ideally, we would expose a health check directly on SimpleDb, but
                                    // RemoteStore only has access to persistence through LocalStore.
                                    return De("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , this.F_.Oo() ];

                                  case 1:
                                    // Issue a simple read operation to determine if IndexedDB recovered.
                                    // Ideally, we would expose a health check directly on SimpleDb, but
                                    // RemoteStore only has access to persistence through LocalStore.
                                    return t.sent(), this.L_ = !1, [ 4 /*yield*/ , this.J_() ];

                                  case 2:
                                    return t.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
    t.prototype.ul = function(t) {
        var e = this, n = this.M_.Xs(t);
        // Update in-memory resume tokens. LocalStore will update the
        // persistent view of these when applying the completed RemoteEvent.
        // Finally raise remote event
        return n.as.forEach((function(n, r) {
            if (n.resumeToken.rt() > 0) {
                var i = e.k_.get(r);
                // A watched target might have been removed already.
                                i && e.k_.set(r, i.we(n.resumeToken, t));
            }
        })), 
        // Re-establish listens for the targets that have been invalidated by
        // existence filter mismatches.
        n.us.forEach((function(t) {
            var n = e.k_.get(t);
            if (n) {
                // Clear the resume token for the target, since we're in a known mismatch
                // state.
                e.k_.set(t, n.we(C.ht, n.Ee)), 
                // Cause a hard reset by unwatching and rewatching immediately, but
                // deliberately don't send a resume token so that we get a full update.
                e.rl(t);
                // Mark the target we send as being on behalf of an existence filter
                // mismatch, but don't actually retain that in listenTargets. This ensures
                // that we flag the first re-listen this way without impacting future
                // listens of this target (that might happen e.g. on reconnect).
                var r = new jt(n.target, t, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                e.il(r);
            }
        })), this.hl.Mu(n);
    }, 
    /** Handles an error on a target */ t.prototype.ol = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    e = t.cause, r = 0, i = t.targetIds, n.label = 1;

                  case 1:
                    return r < i.length ? (o = i[r], this.k_.has(o) ? [ 4 /*yield*/ , this.hl.cl(o, e) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                  case 2:
                    n.sent(), this.k_.delete(o), this.M_.removeTarget(o), n.label = 3;

                  case 3:
                    n.label = 4;

                  case 4:
                    return r++, [ 3 /*break*/ , 1 ];

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */
    t.prototype.tl = function() {
        return e(this, void 0, void 0, (function() {
            var t, e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this._l() ? (t = this.N_.length > 0 ? this.N_[this.N_.length - 1].batchId : -1, 
                    [ 4 /*yield*/ , this.F_.Bu(t) ]) : [ 3 /*break*/ , 5 ];

                  case 1:
                    return null !== (e = n.sent()) ? [ 3 /*break*/ , 2 ] : (0 === this.N_.length && this.G_.Wc(), 
                    [ 3 /*break*/ , 4 ]);

                  case 2:
                    return this.ll(e), [ 4 /*yield*/ , this.tl() ];

                  case 3:
                    n.sent(), n.label = 4;

                  case 4:
                    n.label = 5;

                  case 5:
                    return this.dl() && this.fl(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */
    t.prototype._l = function() {
        return this.B_() && this.N_.length < 10;
    }, 
    // For testing
    t.prototype.Tl = function() {
        return this.N_.length;
    }, 
    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */
    t.prototype.ll = function(t) {
        this.N_.push(t), this.G_.qc() && this.G_.h_ && this.G_.o_(t.mutations);
    }, t.prototype.dl = function() {
        return this.B_() && !this.G_.Bc() && this.N_.length > 0;
    }, t.prototype.fl = function() {
        this.G_.start();
    }, t.prototype.z_ = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                return this.G_.c_(), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Y_ = function() {
        var t = this;
        // Record the stream token.
                return this.F_.fo(this.G_.lastStreamToken).then((function() {
            // Send the write pipeline now that the stream is established.
            for (var e = 0, n = t.N_; e < n.length; e++) {
                var r = n[e];
                t.G_.o_(r.mutations);
            }
        })).catch(pr);
    }, t.prototype.a_ = function(t, e) {
        var n = this, r = this.N_.shift(), i = je.from(r, t, e, this.G_.lastStreamToken);
        return this.hl.El(i).then((function() {
            return n.tl();
        }));
    }, t.prototype.H_ = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t && this.N_.length > 0 ? this.G_.h_ ? [ 4 /*yield*/ , this.Il(t) ] : [ 3 /*break*/ , 2 ] : [ 3 /*break*/ , 5 ];

                  case 1:
                    // This error affects the actual write.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    // If there was an error before the handshake has finished, it's
                    // possible that the server is unable to process the stream token
                    // we're sending. (Perhaps it's too old?)
                    return [ 4 /*yield*/ , this.wl(t) ];

                  case 3:
                    // If there was an error before the handshake has finished, it's
                    // possible that the server is unable to process the stream token
                    // we're sending. (Perhaps it's too old?)
                    e.sent(), e.label = 4;

                  case 4:
                    // The write stream might have been started by refilling the write
                    // pipeline for failed writes
                    this.dl() && this.fl(), e.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.wl = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                // Reset the token if it's a permanent error, signaling the write stream is
                // no longer valid. Note that the handshake does not count as a write: see
                // comments on isPermanentWriteError for details.
                return Gt(t.code) ? [ 2 /*return*/ , (De("RemoteStore", "RemoteStore error before completed handshake; resetting stream token: ", this.G_.lastStreamToken), 
                this.G_.lastStreamToken = C.ht, this.F_.fo(C.ht).catch(pr)) ] : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Il = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i = this;
            return n(this, (function(n) {
                // Only handle permanent errors here. If it's transient, just let the retry
                // logic kick in.
                return Gt(r = t.code) && r !== T.ABORTED ? (e = this.N_.shift(), [ 2 /*return*/ , (this.G_.Qc(), 
                this.hl.Rl(e.batchId, t).then((function() {
                    return i.tl();
                }))) ]) : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Al = function() {
        return new hi(this.f_);
    }, t.prototype.q_ = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.networkEnabled = !1, [ 4 /*yield*/ , this.el() ];

                  case 1:
                    return t.sent(), this.U_.set("Unknown" /* Unknown */), [ 4 /*yield*/ , this.enableNetwork() ];

                  case 2:
                    return t.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.ml = function() {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.B_() ? (
                    // Tear down and re-create our network streams. This will ensure we get a fresh auth token
                    // for the new user and re-fill the write pipeline with new mutations from the LocalStore
                    // (since mutations are per-user).
                    De("RemoteStore", "RemoteStore restarting streams for new credential"), [ 4 /*yield*/ , this.q_() ]) : [ 3 /*break*/ , 2 ];

                  case 1:
                    t.sent(), t.label = 2;

                  case 2:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */
    t.prototype.Pl = function(t) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.isPrimary = t, t && this.networkEnabled ? [ 4 /*yield*/ , this.enableNetwork() ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    return n.sent(), [ 3 /*break*/ , 5 ];

                  case 2:
                    return (e = t) ? [ 3 /*break*/ , 4 ] : [ 4 /*yield*/ , this.el() ];

                  case 3:
                    n.sent(), e = this.U_.set("Unknown" /* Unknown */), n.label = 4;

                  case 4:
                    e, n.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}();

/**
 * A PersistentStream that implements the Listen RPC.
 *
 * Once the Listen stream has called the onOpen() listener, any number of
 * listen() and unlisten() calls can be made to control what changes will be
 * sent from the server for ListenResponses.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The format of the LocalStorage key that stores the client state is:
//     firestore_clients_<persistence_prefix>_<instance_key>
/** Assembles the key for a client state in WebStorage */
function li(t, e) {
    return "firestore_clients_" + t + "_" + e;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>
// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */ function pi(t, e, n) {
    var r = "firestore_mutations_" + t + "_" + n;
    return e.t() && (r += "_" + e.uid), r;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */ function di(t, e) {
    return "firestore_targets_" + t + "_" + e;
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
var yi = /** @class */ function() {
    function t(t, e, n, r) {
        this.user = t, this.batchId = e, this.state = n, this.error = r
        /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vl = function(e, n, r) {
        var i = JSON.parse(r), o = "object" == typeof i && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(i.state) && (void 0 === i.error || "object" == typeof i.error), s = void 0;
        return o && i.error && ((o = "string" == typeof i.error.message && "string" == typeof i.error.code) && (s = new I(i.error.code, i.error.message))), 
        o ? new t(e, n, i.state, s) : (ke("SharedClientState", "Failed to parse mutation state for ID '" + n + "': " + r), 
        null);
    }, t.prototype.gl = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), vi = /** @class */ function() {
    function t(t, e, n) {
        this.targetId = t, this.state = e, this.error = n
        /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vl = function(e, n) {
        var r = JSON.parse(n), i = "object" == typeof r && -1 !== [ "not-current", "current", "rejected" ].indexOf(r.state) && (void 0 === r.error || "object" == typeof r.error), o = void 0;
        return i && r.error && ((i = "string" == typeof r.error.message && "string" == typeof r.error.code) && (o = new I(r.error.code, r.error.message))), 
        i ? new t(e, r.state, o) : (ke("SharedClientState", "Failed to parse target state for ID '" + e + "': " + n), 
        null);
    }, t.prototype.gl = function() {
        var t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }, t;
}(), mi = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.activeTargetIds = e
        /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vl = function(e, n) {
        for (var r = JSON.parse(n), i = "object" == typeof r && r.activeTargetIds instanceof Array, o = se(), s = 0; i && s < r.activeTargetIds.length; ++s) i = B(r.activeTargetIds[s]), 
        o = o.add(r.activeTargetIds[s]);
        return i ? new t(e, o) : (ke("SharedClientState", "Failed to parse client data for instance '" + e + "': " + n), 
        null);
    }, t;
}(), gi = /** @class */ function() {
    function t(t, e) {
        this.clientId = t, this.onlineState = e
        /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */;
    }
    return t.Vl = function(e) {
        var n = JSON.parse(e);
        return "object" == typeof n && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(n.onlineState) && "string" == typeof n.clientId ? new t(n.clientId, n.onlineState) : (ke("SharedClientState", "Failed to parse online state: " + e), 
        null);
    }, t;
}(), wi = /** @class */ function() {
    function t() {
        this.activeTargetIds = se();
    }
    return t.prototype.pl = function(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }, t.prototype.yl = function(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }, 
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t.prototype.gl = function() {
        var t = {
            activeTargetIds: this.activeTargetIds.W(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }, t;
}(), Ei = /** @class */ function() {
    function t(e, n, r, i, o) {
        if (this.Tr = e, this.platform = n, this.persistenceKey = r, this.bl = i, this.hl = null, 
        this.V_ = null, this.ur = null, this.vl = this.Sl.bind(this), this.Dl = new Qt(Pe), 
        this.vh = !1, 
        /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
        this.Cl = [], !t.Uh(this.platform)) throw new I(T.UNIMPLEMENTED, "LocalStorage is not available on this platform.");
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
                var s = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.platform.window.localStorage, this.currentUser = o, this.Fl = li(this.persistenceKey, this.bl), 
        this.Nl = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return "firestore_sequence_number_" + t;
        }(this.persistenceKey), this.Dl = this.Dl.Ae(this.bl, new wi), this.kl = new RegExp("^firestore_clients_" + s + "_([^_]*)$"), 
        this.$l = new RegExp("^firestore_mutations_" + s + "_(\\d+)(?:_(.*))?$"), this.Ml = new RegExp("^firestore_targets_" + s + "_(\\d+)$"), 
        this.Ll = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return "firestore_online_state_" + t;
        }(this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.platform.window.addEventListener("storage", this.vl);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    return t.Uh = function(t) {
        return !(!t.window || null == t.window.localStorage);
    }, t.prototype.start = function() {
        return e(this, void 0, void 0, (function() {
            var t, e, r, i, o, s, u, a, h, c, f, l = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.hl._u() ];

                  case 1:
                    for (t = n.sent(), e = 0, r = t; e < r.length; e++) (i = r[e]) !== this.bl && (o = this.getItem(li(this.persistenceKey, i))) && (s = mi.Vl(i, o)) && (this.Dl = this.Dl.Ae(s.clientId, s));
                    for (this.Ol(), (u = this.storage.getItem(this.Ll)) && (a = this.xl(u)) && this.Bl(a), 
                    h = 0, c = this.Cl; h < c.length; h++) f = c[h], this.Sl(f);
                    return this.Cl = [], 
                    // Register a window unload hook to remove the client metadata entry from
                    // WebStorage even if `shutdown()` was not called.
                    this.platform.window.addEventListener("unload", (function() {
                        return l.hu();
                    })), this.vh = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.lr = function(t) {
        this.setItem(this.Nl, JSON.stringify(t));
    }, t.prototype.ql = function() {
        return this.Ul(this.Dl);
    }, t.prototype.Ql = function(t) {
        var e = !1;
        return this.Dl.forEach((function(n, r) {
            r.activeTargetIds.has(t) && (e = !0);
        })), e;
    }, t.prototype.Wl = function(t) {
        this.jl(t, "pending");
    }, t.prototype.Kl = function(t, e, n) {
        this.jl(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.Gl(t);
    }, t.prototype.zl = function(t) {
        var e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.Ql(t)) {
            var n = this.storage.getItem(di(this.persistenceKey, t));
            if (n) {
                var r = vi.Vl(t, n);
                r && (e = r.state);
            }
        }
        return this.Hl.pl(t), this.Ol(), e;
    }, t.prototype.Yl = function(t) {
        this.Hl.yl(t), this.Ol();
    }, t.prototype.Jl = function(t) {
        return this.Hl.activeTargetIds.has(t);
    }, t.prototype.Xl = function(t) {
        this.removeItem(di(this.persistenceKey, t));
    }, t.prototype.Zl = function(t, e, n) {
        this.td(t, e, n);
    }, t.prototype.Su = function(t, e, n) {
        var r = this;
        e.forEach((function(t) {
            r.Gl(t);
        })), this.currentUser = t, n.forEach((function(t) {
            r.Wl(t);
        }));
    }, t.prototype.ed = function(t) {
        this.sd(t);
    }, t.prototype.hu = function() {
        this.vh && (this.platform.window.removeEventListener("storage", this.vl), this.removeItem(this.Fl), 
        this.vh = !1);
    }, t.prototype.getItem = function(t) {
        var e = this.storage.getItem(t);
        return De("SharedClientState", "READ", t, e), e;
    }, t.prototype.setItem = function(t, e) {
        De("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }, t.prototype.removeItem = function(t) {
        De("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }, t.prototype.Sl = function(t) {
        var r = this;
        if (t.storageArea === this.storage) {
            if (De("SharedClientState", "EVENT", t.key, t.newValue), t.key === this.Fl) return void ke("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.Tr.Xr((function() {
                return e(r, void 0, void 0, (function() {
                    var e, r, i, o, s, u;
                    return n(this, (function(n) {
                        if (this.vh) {
                            if (null !== t.key) if (this.kl.test(t.key)) {
                                if (null == t.newValue) return e = this.nd(t.key), [ 2 /*return*/ , this.rd(e, null) ];
                                if (r = this.hd(t.key, t.newValue)) return [ 2 /*return*/ , this.rd(r.clientId, r) ];
                            } else if (this.$l.test(t.key)) {
                                if (null !== t.newValue && (i = this.od(t.key, t.newValue))) return [ 2 /*return*/ , this.ad(i) ];
                            } else if (this.Ml.test(t.key)) {
                                if (null !== t.newValue && (o = this.ud(t.key, t.newValue))) return [ 2 /*return*/ , this._d(o) ];
                            } else if (t.key === this.Ll) {
                                if (null !== t.newValue && (s = this.xl(t.newValue))) return [ 2 /*return*/ , this.Bl(s) ];
                            } else t.key === this.Nl && (u = function(t) {
                                var e = Ye.dr;
                                if (null != t) try {
                                    var n = JSON.parse(t);
                                    Ve("number" == typeof n), e = n;
                                } catch (t) {
                                    ke("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }(t.newValue)) !== Ye.dr && this.ur(u);
                        } else this.Cl.push(t);
                        return [ 2 /*return*/ ];
                    }));
                }));
            }));
        }
    }, Object.defineProperty(t.prototype, "Hl", {
        get: function() {
            return this.Dl.get(this.bl);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Ol = function() {
        this.setItem(this.Fl, this.Hl.gl());
    }, t.prototype.jl = function(t, e, n) {
        var r = new yi(this.currentUser, t, e, n), i = pi(this.persistenceKey, this.currentUser, t);
        this.setItem(i, r.gl());
    }, t.prototype.Gl = function(t) {
        var e = pi(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }, t.prototype.sd = function(t) {
        var e = {
            clientId: this.bl,
            onlineState: t
        };
        this.storage.setItem(this.Ll, JSON.stringify(e));
    }, t.prototype.td = function(t, e, n) {
        var r = di(this.persistenceKey, t), i = new vi(t, e, n);
        this.setItem(r, i.gl());
    }, 
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */
    t.prototype.nd = function(t) {
        var e = this.kl.exec(t);
        return e ? e[1] : null;
    }, 
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */
    t.prototype.hd = function(t, e) {
        var n = this.nd(t);
        return mi.Vl(n, e);
    }, 
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.od = function(t, e) {
        var n = this.$l.exec(t), r = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return yi.Vl(new b(i), r, e);
    }, 
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.ud = function(t, e) {
        var n = this.Ml.exec(t), r = Number(n[1]);
        return vi.Vl(r, e);
    }, 
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */
    t.prototype.xl = function(t) {
        return gi.Vl(t);
    }, t.prototype.ad = function(t) {
        return e(this, void 0, void 0, (function() {
            return n(this, (function(e) {
                return t.user.uid === this.currentUser.uid ? [ 2 /*return*/ , this.hl.ld(t.batchId, t.state, t.error) ] : (De("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid), 
                [ 2 /*return*/ ]);
            }));
        }));
    }, t.prototype._d = function(t) {
        return this.hl.dd(t.targetId, t.state, t.error);
    }, t.prototype.rd = function(t, e) {
        var n = this, r = e ? this.Dl.Ae(t, e) : this.Dl.remove(t), i = this.Ul(this.Dl), o = this.Ul(r), s = [], u = [];
        return o.forEach((function(t) {
            i.has(t) || s.push(t);
        })), i.forEach((function(t) {
            o.has(t) || u.push(t);
        })), this.hl.fd(s, u).then((function() {
            n.Dl = r;
        }));
    }, t.prototype.Bl = function(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.Dl.get(t.clientId) && this.V_(t.onlineState);
    }, t.prototype.Ul = function(t) {
        var e = se();
        return t.forEach((function(t, n) {
            e = e.He(n.activeTargetIds);
        })), e;
    }, t;
}(), bi = /** @class */ function() {
    function t() {
        this.Td = new wi, this.Ed = {}, this.hl = null, this.V_ = null, this.ur = null;
    }
    return t.prototype.Wl = function(t) {
        // No op.
    }, t.prototype.Kl = function(t, e, n) {
        // No op.
    }, t.prototype.zl = function(t) {
        return this.Td.pl(t), this.Ed[t] || "not-current";
    }, t.prototype.Zl = function(t, e, n) {
        this.Ed[t] = e;
    }, t.prototype.Yl = function(t) {
        this.Td.yl(t);
    }, t.prototype.Jl = function(t) {
        return this.Td.activeTargetIds.has(t);
    }, t.prototype.Xl = function(t) {
        delete this.Ed[t];
    }, t.prototype.ql = function() {
        return this.Td.activeTargetIds;
    }, t.prototype.Ql = function(t) {
        return this.Td.activeTargetIds.has(t);
    }, t.prototype.start = function() {
        return this.Td = new wi, Promise.resolve();
    }, t.prototype.Su = function(t, e, n) {
        // No op.
    }, t.prototype.ed = function(t) {
        // No op.
    }, t.prototype.hu = function() {}, t.prototype.lr = function(t) {}, t;
}(), Ti = function(t) {
    this.key = t;
}, Ii = function(t) {
    this.key = t;
}, Ni = /** @class */ function() {
    function t(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.Id = e, this.wd = null, 
        /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
        this.fs = !1, 
        /** Documents in the view but not in the remote target */
        this.Rd = ie(), 
        /** Document Keys that have local changes */
        this.ns = ie(), this.Ad = new ue(t.se.bind(t));
    }
    return Object.defineProperty(t.prototype, "md", {
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */
        get: function() {
            return this.Id;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges The doc changes to apply to this view.
     * @param previousChanges If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @return a new set of docs, changes, and refill flag.
     */
    t.prototype.Pd = function(t, e) {
        var n = this, r = e ? e.Vd : new ae, i = e ? e.Ad : this.Ad, o = e ? e.ns : this.ns, s = i, u = !1, a = this.query.oe() && i.size === this.query.limit ? i.last() : null, h = this.query.ae() && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.pe((function(t, e) {
            var c = i.get(t), f = e instanceof kt ? e : null;
            f && (f = n.query.matches(f) ? f : null);
            var l = !!c && n.ns.has(c.key), p = !!f && (f.At || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.ns.has(f.key) && f.hasCommittedMutations), d = !1;
            // Calculate change
            c && f ? c.data().isEqual(f.data()) ? l !== p && (r.track({
                type: 3 /* Metadata */ ,
                doc: f
            }), d = !0) : n.gd(c, f) || (r.track({
                type: 2 /* Modified */ ,
                doc: f
            }), d = !0, (a && n.query.se(f, a) > 0 || h && n.query.se(f, h) < 0) && (
            // This doc moved from inside the limit to outside the limit.
            // That means there may be some other doc in the local cache
            // that should be included instead.
            u = !0)) : !c && f ? (r.track({
                type: 0 /* Added */ ,
                doc: f
            }), d = !0) : c && !f && (r.track({
                type: 1 /* Removed */ ,
                doc: c
            }), d = !0, (a || h) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            u = !0)), d && (f ? (s = s.add(f), o = p ? o.add(t) : o.delete(t)) : (s = s.delete(t), 
            o = o.delete(t)));
        })), this.query.oe() || this.query.ae()) for (;s.size > this.query.limit; ) {
            var c = this.query.oe() ? s.last() : s.first();
            s = s.delete(c.key), o = o.delete(c.key), r.track({
                type: 1 /* Removed */ ,
                doc: c
            });
        }
        return {
            Ad: s,
            Vd: r,
            pd: u,
            ns: o
        };
    }, t.prototype.gd = function(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.At && e.hasCommittedMutations && !e.At;
    }, 
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges The set of changes to make to the view's docs.
     * @param updateLimboDocuments Whether to update limbo documents based on this
     *        change.
     * @param targetChange A target change to apply for computing limbo docs and
     *        sync state.
     * @return A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    t.prototype.xn = function(t, e, n) {
        var r = this, i = this.Ad;
        this.Ad = t.Ad, this.ns = t.ns;
        // Sort changes based on type and query comparator
        var o = t.Vd.es();
        o.sort((function(t, e) {
            return function(t, e) {
                var n = function(t) {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return xe();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.query.se(t.doc, e.doc);
        })), this.yd(n);
        var s = e ? this.bd() : [], u = 0 === this.Rd.size && this.fs ? 1 /* Synced */ : 0 /* Local */ , a = u !== this.wd;
        return this.wd = u, 0 !== o.length || a ? {
            snapshot: new he(this.query, t.Ad, i, o, t.ns, 0 /* Local */ === u, a, 
            /* excludesMetadataChanges= */ !1),
            vd: s
        } : {
            vd: s
        };
        // no changes
        }, 
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t.prototype.Sd = function(t) {
        return this.fs && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.fs = !1, this.xn({
            Ad: this.Ad,
            Vd: new ae,
            ns: this.ns,
            pd: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            vd: []
        };
    }, 
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t.prototype.Dd = function(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.Id.has(t) && 
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.Ad.has(t) && !this.Ad.get(t).At;
    }, 
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t.prototype.yd = function(t) {
        var e = this;
        t && (t.Ts.forEach((function(t) {
            return e.Id = e.Id.add(t);
        })), t.Es.forEach((function(t) {})), t.Is.forEach((function(t) {
            return e.Id = e.Id.delete(t);
        })), this.fs = t.fs);
    }, t.prototype.bd = function() {
        var t = this;
        // We can only determine limbo documents when we're in-sync with the server.
                if (!this.fs) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                var e = this.Rd;
        this.Rd = ie(), this.Ad.forEach((function(e) {
            t.Dd(e.key) && (t.Rd = t.Rd.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.Rd.has(e) || n.push(new Ii(e));
        })), this.Rd.forEach((function(t) {
            e.has(t) || n.push(new Ti(t));
        })), n;
    }, 
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @return The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Cd = function(t) {
        this.Id = t.ju, this.Rd = ie();
        var e = this.Pd(t.documents);
        return this.xn(e, /*updateLimboDocuments=*/ !0);
    }, 
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Fd = function() {
        return he.os(this.query, this.Ad, this.ns, 0 /* Local */ === this.wd);
    }, t;
}(), Ai = /** @class */ function() {
    function t(t, e, n, r) {
        this.br = t, this.Nd = e, this.updateFunction = n, this.Dr = r, this.kd = 5, this.Qr = new Xe(this.br, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.$d = function() {
        this.Md();
    }, t.prototype.Md = function() {
        var t = this;
        this.Qr.gr((function() {
            return e(t, void 0, void 0, (function() {
                var t, e, r = this;
                return n(this, (function(n) {
                    return t = this.Nd.Al(), (e = this.Ld(t)) && e.then((function(e) {
                        r.br.$r((function() {
                            return t.commit().then((function() {
                                r.Dr.resolve(e);
                            })).catch((function(t) {
                                r.Od(t);
                            }));
                        }));
                    })).catch((function(t) {
                        r.Od(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.Ld = function(t) {
        try {
            var e = this.updateFunction(t);
            return !F(e) && e.catch && e.then ? e : (this.Dr.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.Dr.reject(t), null;
        }
    }, t.prototype.Od = function(t) {
        var e = this;
        this.kd > 0 && this.xd(t) ? (this.kd -= 1, this.br.$r((function() {
            return e.Md(), Promise.resolve();
        }))) : this.Dr.reject(t);
    }, t.prototype.xd = function(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var e = t.code;
            return "aborted" === e || "failed-precondition" === e || !Gt(e);
        }
        return !1;
    }, t;
}(), _i = function(
/**
     * The query itself.
     */
t, 
/**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
e, 
/**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
n) {
    this.query = t, this.targetId = e, this.view = n;
}, Di = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.Bd = !1;
}, ki = /** @class */ function() {
    function t(t, e, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    n, r, i) {
        this.F_ = t, this.Nd = e, this.qd = n, this.currentUser = r, this.Ud = i, this.Qd = null, 
        this.Wd = new Ce((function(t) {
            return t.canonicalId();
        })), this.jd = new Map, 
        /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query.
             */
        this.Kd = [], 
        /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
        this.Gd = new Qt(L.N), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.zd = new Map, this.Hd = new dr, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.Yd = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.Jd = new Map, this.Xd = Nn.ko(), this.onlineState = "Unknown" /* Unknown */;
    }
    return Object.defineProperty(t.prototype, "Zd", {
        get: function() {
            return !0;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Subscribes to SyncEngine notifications. Has to be called exactly once. */ t.prototype.subscribe = function(t) {
        this.Qd = t;
    }, 
    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */
    t.prototype.listen = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o, s;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.tf("listen()"), (i = this.Wd.get(t)) ? (
                    // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                    // already exists when EventManager calls us for the first time. This
                    // happens when the primary tab is already listening to this query on
                    // behalf of another tab and the user of the primary also starts listening
                    // to the query. EventManager will not have an assigned target ID in this
                    // case and calls `listen` to obtain this ID.
                    e = i.targetId, this.qd.zl(e), r = i.view.Fd(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , this.F_.Uu(t.ee()) ];

                  case 2:
                    return o = n.sent(), s = this.qd.zl(o.targetId), e = o.targetId, [ 4 /*yield*/ , this.ef(t, e, "current" === s) ];

                  case 3:
                    r = n.sent(), this.Zd && this.Nd.listen(o), n.label = 4;

                  case 4:
                    return [ 2 /*return*/ , r ];
                }
            }));
        }));
    }, 
    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */
    t.prototype.ef = function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e, o, s, u, a, h;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.F_.Wu(t, 
                    /* usePreviousResults= */ !0) ];

                  case 1:
                    return e = n.sent(), o = new Ni(t, e.ju), s = o.Pd(e.documents), u = fe.ds(r, i && "Offline" /* Offline */ !== this.onlineState), 
                    a = o.xn(s, 
                    /* updateLimboDocuments= */ this.Zd, u), this.sf(r, a.vd), h = new _i(t, r, o), 
                    [ 2 /*return*/ , (this.Wd.set(t, h), this.jd.has(r) ? this.jd.get(r).push(t) : this.jd.set(r, [ t ]), 
                    a.snapshot) ];
                }
            }));
        }));
    }, 
    /** Stops listening to the query. */ t.prototype.nl = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    // Only clean up the query view and target if this is the only query mapped
                    // to the target.
                    return this.tf("unlisten()"), e = this.Wd.get(t), (r = this.jd.get(e.targetId)).length > 1 ? [ 2 /*return*/ , (this.jd.set(e.targetId, r.filter((function(e) {
                        return !e.isEqual(t);
                    }))), void this.Wd.delete(t)) ] : this.Zd ? (
                    // We need to remove the local query target first to allow us to verify
                    // whether any other client is still interested in this target.
                    this.qd.Yl(e.targetId), this.qd.Ql(e.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , this.F_.Qu(e.targetId, /*keepPersistedTargetData=*/ !1).then((function() {
                        i.qd.Xl(e.targetId), i.Nd.nl(e.targetId), i.if(e.targetId);
                    })).catch(pr) ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    n.sent(), n.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 5 ];

                  case 3:
                    return this.if(e.targetId), [ 4 /*yield*/ , this.F_.Qu(e.targetId, 
                    /*keepPersistedTargetData=*/ !0) ];

                  case 4:
                    n.sent(), n.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */
    t.prototype.write = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e, i;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    this.tf("write()"), n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.F_.Nu(t) ];

                  case 2:
                    return e = n.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if ("IndexedDbTransactionError" === (i = n.sent()).name) 
                    // If we can't persist the mutation, we reject the user callback and
                    // don't send the mutation. The user can then retry the write.
                    return [ 2 /*return*/ , (ke("SyncEngine", "Dropping write that cannot be persisted: " + i), 
                    void r.reject(new I(T.UNAVAILABLE, "Failed to persist write: " + i))) ];
                    throw i;

                  case 4:
                    return this.qd.Wl(e.batchId), this.nf(e.batchId, r), [ 4 /*yield*/ , this.rf(e.Dn) ];

                  case 5:
                    return n.sent(), [ 4 /*yield*/ , this.Nd.tl() ];

                  case 6:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Takes an updateFunction in which a set of reads and writes can be performed
     * atomically. In the updateFunction, the client can read and write values
     * using the supplied transaction object. After the updateFunction, all
     * changes will be committed. If a retryable error occurs (ex: some other
     * client has changed any of the data referenced), then the updateFunction
     * will be called again after a backoff. If the updateFunction still fails
     * after all retries, then the transaction will be rejected.
     *
     * The transaction object passed to the updateFunction contains methods for
     * accessing documents and collections. Unlike other datastore access, data
     * accessed with the transaction will not reflect local changes that have not
     * been committed. For this reason, it is required that all reads are
     * performed before any writes. Transactions must be performed while online.
     *
     * The Deferred input is resolved when the transaction is fully committed.
     */
    t.prototype.runTransaction = function(t, e, n) {
        new Ai(t, this.Nd, e, n).$d();
    }, t.prototype.Mu = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    this.tf("applyRemoteEvent()"), n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.F_.Mu(t) ];

                  case 2:
                    return e = n.sent(), 
                    // Update `receivedDocument` as appropriate for any limbo targets.
                    t.as.forEach((function(t, e) {
                        var n = r.zd.get(e);
                        n && (
                        // Since this is a limbo resolution lookup, it's for a single document
                        // and it could be added, modified, or removed, but not a combination.
                        Ve(t.Ts.size + t.Es.size + t.Is.size <= 1), t.Ts.size > 0 ? n.Bd = !0 : t.Es.size > 0 ? Ve(n.Bd) : t.Is.size > 0 && (Ve(n.Bd), 
                        n.Bd = !1));
                    })), [ 4 /*yield*/ , this.rf(e, t) ];

                  case 3:
                    // Update `receivedDocument` as appropriate for any limbo targets.
                    return n.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , pr(n.sent()) ];

                  case 5:
                    return n.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */
    t.prototype.Sd = function(t, e) {
        this.tf("applyOnlineStateChange()");
        var n = [];
        this.Wd.forEach((function(e, r) {
            var i = r.view.Sd(t);
            i.snapshot && n.push(i.snapshot);
        })), this.Qd.hf(t), this.Qd.s_(n), this.onlineState = t;
    }, t.prototype.cl = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e, i, o, s, u, a = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.tf("rejectListens()"), 
                    // PORTING NOTE: Multi-tab only.
                    this.qd.Zl(t, "rejected", r), e = this.zd.get(t), (i = e && e.key) ? (
                    // Since this query failed, we won't want to manually unlisten to it.
                    // So go ahead and remove it from bookkeeping.
                    this.Gd = this.Gd.remove(i), this.zd.delete(t), this.af(), o = (o = new Qt(L.N)).Ae(i, new St(i, x.min())), 
                    s = ie().add(i), u = new ce(x.min(), 
                    /* targetChanges= */ new Map, 
                    /* targetMismatches= */ new Yt(Pe), o, s), [ 2 /*return*/ , this.Mu(u) ]) : [ 4 /*yield*/ , this.F_.Qu(t, /* keepPersistedTargetData */ !1).then((function() {
                        return a.if(t, r);
                    })).catch(pr) ];

                  case 1:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.El = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    this.tf("applySuccessfulWrite()"), e = t.batch.batchId, 
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught
                    // up), so we raise user callbacks first so that they consistently happen
                    // before listen events.
                    this.uf(e, /*error=*/ null), this.cf(e), n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.F_._o(t) ];

                  case 2:
                    return r = n.sent(), this.qd.Kl(e, "acknowledged"), [ 4 /*yield*/ , this.rf(r) ];

                  case 3:
                    return n.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , pr(n.sent()) ];

                  case 5:
                    return n.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Rl = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    this.tf("rejectFailedWrite()"), 
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught up),
                    // so we raise user callbacks first so that they consistently happen before
                    // listen events.
                    this.uf(t, r), this.cf(t), n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.F_.$u(t) ];

                  case 2:
                    return e = n.sent(), this.qd.Kl(t, "rejected", r), [ 4 /*yield*/ , this.rf(e) ];

                  case 3:
                    return n.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , pr(n.sent()) ];

                  case 5:
                    return n.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Registers a user callback that resolves when all pending mutations at the moment of calling
     * are acknowledged .
     */
    t.prototype._f = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.Nd.B_() || De("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                    [ 4 /*yield*/ , this.F_.Po() ];

                  case 1:
                    return -1 === (e = n.sent()) ? [ 2 /*return*/ , void t.resolve() ] : ((r = this.Jd.get(e) || []).push(t), 
                    this.Jd.set(e, r), [ 2 /*return*/ ]);
                }
            }));
        }));
    }, 
    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */
    t.prototype.cf = function(t) {
        (this.Jd.get(t) || []).forEach((function(t) {
            t.resolve();
        })), this.Jd.delete(t);
    }, 
    /** Reject all outstanding callbacks waiting for pending writes to complete. */ t.prototype.lf = function(t) {
        this.Jd.forEach((function(e) {
            e.forEach((function(e) {
                e.reject(new I(T.CANCELLED, t));
            }));
        })), this.Jd.clear();
    }, t.prototype.nf = function(t, e) {
        var n = this.Yd[this.currentUser.s()];
        n || (n = new Qt(Pe)), n = n.Ae(t, e), this.Yd[this.currentUser.s()] = n;
    }, 
    /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */
    t.prototype.uf = function(t, e) {
        var n = this.Yd[this.currentUser.s()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
                if (n) {
            var r = n.get(t);
            r && (e ? r.reject(e) : r.resolve(), n = n.remove(t)), this.Yd[this.currentUser.s()] = n;
        }
    }, t.prototype.if = function(t, e) {
        var n = this;
        void 0 === e && (e = null), this.qd.Yl(t);
        for (var r = 0, i = this.jd.get(t); r < i.length; r++) {
            var o = i[r];
            this.Wd.delete(o), e && this.Qd.df(o, e);
        }
        this.jd.delete(t), this.Zd && this.Hd.ic(t).forEach((function(t) {
            n.Hd.Co(t) || 
            // We removed the last reference for this key
            n.ff(t);
        }));
    }, t.prototype.ff = function(t) {
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        var e = this.Gd.get(t);
        null !== e && (this.Nd.nl(e), this.Gd = this.Gd.remove(t), this.zd.delete(e), this.af());
    }, t.prototype.sf = function(t, e) {
        for (var n = 0, r = e; n < r.length; n++) {
            var i = r[n];
            i instanceof Ti ? (this.Hd.Xo(i.key, t), this.Tf(i)) : i instanceof Ii ? (De("SyncEngine", "Document no longer in limbo: " + i.key), 
            this.Hd.ta(i.key, t), this.Hd.Co(i.key) || 
            // We removed the last reference for this key
            this.ff(i.key)) : xe();
        }
    }, t.prototype.Tf = function(t) {
        var e = t.key;
        this.Gd.get(e) || (De("SyncEngine", "New document in limbo: " + e), this.Kd.push(e), 
        this.af());
    }, 
    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */
    t.prototype.af = function() {
        for (;this.Kd.length > 0 && this.Gd.size < this.Ud; ) {
            var t = this.Kd.shift(), e = this.Xd.next();
            this.zd.set(e, new Di(t)), this.Gd = this.Gd.Ae(t, e), this.Nd.listen(new jt(Rt.Wt(t.path).ee(), e, 2 /* LimboResolution */ , Ye.dr));
        }
    }, 
    // Visible for testing
    t.prototype.Ef = function() {
        return this.Gd;
    }, 
    // Visible for testing
    t.prototype.If = function() {
        return this.Kd;
    }, t.prototype.rf = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e, i, o, s = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = [], i = [], o = [], this.Wd.forEach((function(n, u) {
                        o.push(Promise.resolve().then((function() {
                            var e = u.view.Pd(t);
                            return e.pd ? s.F_.Wu(u.query, /* usePreviousResults= */ !1).then((function(t) {
                                var n = t.documents;
                                return u.view.Pd(n, e);
                            })) : e;
                            // The query has a limit and some docs were removed, so we need
                            // to re-run the query against the local store to make sure we
                            // didn't lose any good docs that had been past the limit.
                                                })).then((function(t) {
                            var n = r && r.as.get(u.targetId), o = u.view.xn(t, 
                            /* updateLimboDocuments= */ s.Zd, n);
                            if (s.sf(u.targetId, o.vd), o.snapshot) {
                                s.Zd && s.qd.Zl(u.targetId, o.snapshot.fromCache ? "not-current" : "current"), e.push(o.snapshot);
                                var a = Ke.ar(u.targetId, o.snapshot);
                                i.push(a);
                            }
                        })));
                    })), [ 4 /*yield*/ , Promise.all(o) ];

                  case 1:
                    return n.sent(), this.Qd.s_(e), [ 4 /*yield*/ , this.F_.xu(i) ];

                  case 2:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.tf = function(t) {}, t.prototype.ml = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return e = !this.currentUser.isEqual(t), this.currentUser = t, e ? (
                    // Fails tasks waiting for pending writes requested by previous user.
                    this.lf("'waitForPendingWrites' promise is rejected due to a user change."), [ 4 /*yield*/ , this.F_.Su(t) ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    return r = n.sent(), 
                    // TODO(b/114226417): Consider calling this only in the primary tab.
                    this.qd.Su(t, r.Cu, r.Fu), [ 4 /*yield*/ , this.rf(r.Du) ];

                  case 2:
                    // TODO(b/114226417): Consider calling this only in the primary tab.
                    n.sent(), n.label = 3;

                  case 3:
                    return [ 4 /*yield*/ , this.Nd.ml() ];

                  case 4:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.enableNetwork = function() {
        return this.Nd.enableNetwork();
    }, t.prototype.disableNetwork = function() {
        return this.Nd.disableNetwork();
    }, t.prototype.ei = function(t) {
        var e = this.zd.get(t);
        if (e && e.Bd) return ie().add(e.key);
        var n = ie(), r = this.jd.get(t);
        if (!r) return n;
        for (var i = 0, o = r; i < o.length; i++) {
            var s = o[i], u = this.Wd.get(s);
            n = n.He(u.view.md);
        }
        return n;
    }, t;
}(), Si = /** @class */ function(r) {
    function i(t, e, n, i, o) {
        var s = this;
        return (s = r.call(this, t, e, n, i, o) || this).F_ = t, 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        s.isPrimary = void 0, s;
    }
    return t(i, r), Object.defineProperty(i.prototype, "Zd", {
        get: function() {
            return !0 === this.isPrimary;
        },
        enumerable: !0,
        configurable: !0
    }), i.prototype.enableNetwork = function() {
        return this.F_.za(!0), r.prototype.enableNetwork.call(this);
    }, i.prototype.disableNetwork = function() {
        return this.F_.za(!1), r.prototype.disableNetwork.call(this);
    }, 
    /**
     * Reconcile the list of synced documents in an existing view with those
     * from persistence.
     */
    i.prototype.wf = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.F_.Wu(t.query, 
                    /* usePreviousResults= */ !0) ];

                  case 1:
                    return e = n.sent(), r = t.view.Cd(e), [ 2 /*return*/ , (this.isPrimary && this.sf(t.targetId, r.vd), 
                    r) ];
                }
            }));
        }));
    }, i.prototype.Sd = function(t, e) {
        // If we are the primary client, the online state of all clients only
        // depends on the online state of the local RemoteStore.
        this.Zd && 0 /* RemoteStore */ === e && (r.prototype.Sd.call(this, t, e), this.qd.ed(t)), 
        // If we are the secondary client, we explicitly ignore the remote store's
        // online state (the local client may go offline, even though the primary
        // tab remains online) and only apply the primary tab's online state from
        // SharedClientState.
        this.Zd || 1 /* SharedClientState */ !== e || r.prototype.Sd.call(this, t, e);
    }, i.prototype.ld = function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.tf("applyBatchState()"), [ 4 /*yield*/ , this.F_.Gu(t) ];

                  case 1:
                    return null === (e = n.sent()) ? [ 3 /*break*/ , 6 ] : "pending" !== r ? [ 3 /*break*/ , 3 ] : [ 4 /*yield*/ , this.Nd.tl() ];

                  case 2:
                    // If we are the primary client, we need to send this write to the
                    // backend. Secondary clients will ignore these writes since their remote
                    // connection is disabled.
                    return n.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    "acknowledged" === r || "rejected" === r ? (
                    // NOTE: Both these methods are no-ops for batches that originated from
                    // other clients.
                    this.uf(t, i || null), this.F_.zu(t)) : xe(), n.label = 4;

                  case 4:
                    return [ 4 /*yield*/ , this.rf(e) ];

                  case 5:
                    return n.sent(), [ 3 /*break*/ , 7 ];

                  case 6:
                    // A throttled tab may not have seen the mutation before it was completed
                    // and removed from the mutation queue, in which case we won't have cached
                    // the affected documents. In this case we can safely ignore the update
                    // since that means we didn't apply the mutation locally at all (if we
                    // had, we would have cached the affected documents), and so we will just
                    // see any resulting document changes via normal remote document updates
                    // as applicable.
                    De("SyncEngine", "Cannot apply mutation batch with id: " + t), n.label = 7;

                  case 7:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.Pl = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o, s, u, a, h = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return !0 !== t || !0 === this.isPrimary ? [ 3 /*break*/ , 3 ] : (this.isPrimary = !0, 
                    [ 4 /*yield*/ , this.Nd.Pl(!0) ]);

                  case 1:
                    return n.sent(), e = this.qd.ql(), [ 4 /*yield*/ , this.Rf(e.W()) ];

                  case 2:
                    for (r = n.sent(), i = 0, o = r; i < o.length; i++) s = o[i], this.Nd.listen(s);
                    return [ 3 /*break*/ , 7 ];

                  case 3:
                    return !1 !== t || !1 === this.isPrimary ? [ 3 /*break*/ , 7 ] : (this.isPrimary = !1, 
                    u = [], a = Promise.resolve(), this.jd.forEach((function(t, e) {
                        h.qd.Jl(e) ? u.push(e) : a = a.then((function() {
                            return h.if(e), h.F_.Qu(e, 
                            /*keepPersistedTargetData=*/ !0);
                        })), h.Nd.nl(e);
                    })), [ 4 /*yield*/ , a ]);

                  case 4:
                    return n.sent(), [ 4 /*yield*/ , this.Rf(u) ];

                  case 5:
                    return n.sent(), this.Af(), [ 4 /*yield*/ , this.Nd.Pl(!1) ];

                  case 6:
                    n.sent(), n.label = 7;

                  case 7:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.Af = function() {
        var t = this;
        this.zd.forEach((function(e, n) {
            t.Nd.nl(n);
        })), this.Hd.nc(), this.zd = new Map, this.Gd = new Qt(L.N);
    }, 
    /**
     * Reconcile the query views of the provided query targets with the state from
     * persistence. Raises snapshots for any changes that affect the local
     * client and returns the updated state of all target's query data.
     */
    i.prototype.Rf = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o, s, u, a, h, c, f, l, p, d;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    e = [], r = [], i = 0, o = t, n.label = 1;

                  case 1:
                    return i < o.length ? (s = o[i], u = void 0, (a = this.jd.get(s)) && 0 !== a.length ? [ 4 /*yield*/ , this.F_.Qu(s, 
                    /*keepPersistedTargetData=*/ !0) ] : [ 3 /*break*/ , 8 ]) : [ 3 /*break*/ , 14 ];

                  case 2:
                    // For queries that have a local View, we need to update their state
                    // in LocalStore (as the resume token and the snapshot version
                    // might have changed) and reconcile their views with the persisted
                    // state (the list of syncedDocuments may have gotten out of sync).
                    return n.sent(), [ 4 /*yield*/ , this.F_.Uu(a[0].ee()) ];

                  case 3:
                    // For queries that have a local View, we need to update their state
                    // in LocalStore (as the resume token and the snapshot version
                    // might have changed) and reconcile their views with the persisted
                    // state (the list of syncedDocuments may have gotten out of sync).
                    u = n.sent(), h = 0, c = a, n.label = 4;

                  case 4:
                    return h < c.length ? (f = c[h], l = this.Wd.get(f), [ 4 /*yield*/ , this.wf(l) ]) : [ 3 /*break*/ , 7 ];

                  case 5:
                    (p = n.sent()).snapshot && r.push(p.snapshot), n.label = 6;

                  case 6:
                    return h++, [ 3 /*break*/ , 4 ];

                  case 7:
                    return [ 3 /*break*/ , 12 ];

                  case 8:
                    return [ 4 /*yield*/ , this.F_.Hu(s) ];

                  case 9:
                    return d = n.sent(), [ 4 /*yield*/ , this.F_.Uu(d) ];

                  case 10:
                    return u = n.sent(), [ 4 /*yield*/ , this.ef(this.mf(d), s, 
                    /*current=*/ !1) ];

                  case 11:
                    n.sent(), n.label = 12;

                  case 12:
                    e.push(u), n.label = 13;

                  case 13:
                    return i++, [ 3 /*break*/ , 1 ];

                  case 14:
                    return [ 2 /*return*/ , (this.Qd.s_(r), e) ];
                }
            }));
        }));
    }, 
    /**
     * Creates a `Query` object from the specified `Target`. There is no way to
     * obtain the original `Query`, so we synthesize a `Query` from the `Target`
     * object.
     *
     * The synthesized result might be different from the original `Query`, but
     * since the synthesized `Query` should return the same results as the
     * original one (only the presentation of results might differ), the potential
     * difference will not cause issues.
     */
    i.prototype.mf = function(t) {
        return new Rt(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
    }, i.prototype._u = function() {
        return this.F_._u();
    }, i.prototype.dd = function(t, r, i) {
        return e(this, void 0, void 0, (function() {
            var e, o;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.isPrimary ? (
                    // If we receive a target state notification via WebStorage, we are
                    // either already secondary or another tab has taken the primary lease.
                    De("SyncEngine", "Ignoring unexpected query state notification."), [ 3 /*break*/ , 8 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    if (!this.jd.has(t)) return [ 3 /*break*/ , 8 ];
                    switch (r) {
                      case "current":
                      case "not-current":
                        return [ 3 /*break*/ , 2 ];

                      case "rejected":
                        return [ 3 /*break*/ , 5 ];
                    }
                    return [ 3 /*break*/ , 7 ];

                  case 2:
                    return [ 4 /*yield*/ , this.F_.la() ];

                  case 3:
                    return e = n.sent(), o = ce.ls(t, "current" === r), [ 4 /*yield*/ , this.rf(e, o) ];

                  case 4:
                    return n.sent(), [ 3 /*break*/ , 8 ];

                  case 5:
                    return [ 4 /*yield*/ , this.F_.Qu(t, 
                    /* keepPersistedTargetData */ !0) ];

                  case 6:
                    return n.sent(), this.if(t, i), [ 3 /*break*/ , 8 ];

                  case 7:
                    xe(), n.label = 8;

                  case 8:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.fd = function(t, r) {
        return e(this, void 0, void 0, (function() {
            var e, i, o, s, u, a, h, c, f, l, p = this;
            return n(this, (function(d) {
                switch (d.label) {
                  case 0:
                    if (!this.isPrimary) return [ 3 /*break*/ , 10 ];
                    e = 0, i = t, d.label = 1;

                  case 1:
                    return e < i.length ? (o = i[e], this.jd.has(o) ? (
                    // A target might have been added in a previous attempt
                    De("SyncEngine", "Adding an already active target " + o), [ 3 /*break*/ , 5 ]) : [ 4 /*yield*/ , this.F_.Hu(o) ]) : [ 3 /*break*/ , 6 ];

                  case 2:
                    return s = d.sent(), [ 4 /*yield*/ , this.F_.Uu(s) ];

                  case 3:
                    return u = d.sent(), [ 4 /*yield*/ , this.ef(this.mf(s), u.targetId, 
                    /*current=*/ !1) ];

                  case 4:
                    d.sent(), this.Nd.listen(u), d.label = 5;

                  case 5:
                    return e++, [ 3 /*break*/ , 1 ];

                  case 6:
                    a = function(t) {
                        return n(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return h.jd.has(t) ? [ 4 /*yield*/ , h.F_.Qu(t, /* keepPersistedTargetData */ !1).then((function() {
                                    p.Nd.nl(t), p.if(t);
                                })).catch(pr) ] : [ 3 /*break*/ , 2 ];

                                // Release queries that are still active.
                                                              case 1:
                                // Release queries that are still active.
                                e.sent(), e.label = 2;

                              case 2:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }, h = this, c = 0, f = r, d.label = 7;

                  case 7:
                    return c < f.length ? (l = f[c], [ 5 /*yield**/ , a(l) ]) : [ 3 /*break*/ , 10 ];

                  case 8:
                    d.sent(), d.label = 9;

                  case 9:
                    return c++, [ 3 /*break*/ , 7 ];

                  case 10:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, i;
}(ki), xi = function() {
    this.Pf = void 0, this.Vf = [];
}, Vi = /** @class */ function() {
    function t(t) {
        this.hl = t, this.gf = new Ce((function(t) {
            return t.canonicalId();
        })), this.onlineState = "Unknown" /* Unknown */ , this.pf = new Set, this.hl.subscribe(this);
    }
    return t.prototype.listen = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o, s, u;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    if (e = t.query, r = !1, (i = this.gf.get(e)) || (r = !0, i = new xi), !r) return [ 3 /*break*/ , 4 ];
                    n.label = 1;

                  case 1:
                    return n.trys.push([ 1, 3, , 4 ]), o = i, [ 4 /*yield*/ , this.hl.listen(e) ];

                  case 2:
                    return o.Pf = n.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (s = n.sent(), ke("EventManager", u = "Initialization of query '" + e + "' failed: " + s), 
                    "IndexedDbTransactionError" !== s.name) throw s;
                    return [ 2 /*return*/ , void t.onError(new I(T.UNAVAILABLE, u)) ];

                  case 4:
                    return this.gf.set(e, i), i.Vf.push(t), 
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    t.Sd(this.onlineState), i.Pf && t.yf(i.Pf) && this.bf(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.nl = function(t) {
        return e(this, void 0, void 0, (function() {
            var e, r, i, o;
            return n(this, (function(n) {
                return e = t.query, r = !1, (i = this.gf.get(e)) && (o = i.Vf.indexOf(t)) >= 0 && (i.Vf.splice(o, 1), 
                r = 0 === i.Vf.length), r ? [ 2 /*return*/ , (this.gf.delete(e), this.hl.nl(e)) ] : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.s_ = function(t) {
        for (var e = !1, n = 0, r = t; n < r.length; n++) {
            var i = r[n], o = i.query, s = this.gf.get(o);
            if (s) {
                for (var u = 0, a = s.Vf; u < a.length; u++) {
                    a[u].yf(i) && (e = !0);
                }
                s.Pf = i;
            }
        }
        e && this.bf();
    }, t.prototype.df = function(t, e) {
        var n = this.gf.get(t);
        if (n) for (var r = 0, i = n.Vf; r < i.length; r++) {
            i[r].onError(e);
        }
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
                this.gf.delete(t);
    }, t.prototype.hf = function(t) {
        this.onlineState = t;
        var e = !1;
        this.gf.forEach((function(n, r) {
            for (var i = 0, o = r.Vf; i < o.length; i++) {
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                o[i].Sd(t) && (e = !0);
            }
        })), e && this.bf();
    }, t.prototype.vf = function(t) {
        this.pf.add(t), 
        // Immediately fire an initial event, indicating all existing listeners
        // are in-sync.
        t.next();
    }, t.prototype.Sf = function(t) {
        this.pf.delete(t);
    }, 
    // Call all global snapshot listeners that have been set.
    t.prototype.bf = function() {
        this.pf.forEach((function(t) {
            t.next();
        }));
    }, t;
}(), Ri = /** @class */ function() {
    function t(t, e, n) {
        this.query = t, this.Df = e, 
        /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
        this.Cf = !1, this.Ff = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {}
        /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */;
    }
    return t.prototype.yf = function(t) {
        if (!this.options.includeMetadataChanges) {
            for (
            // Remove the metadata only changes.
            var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                var i = r[n];
                3 /* Metadata */ !== i.type && e.push(i);
            }
            t = new he(t.query, t.docs, t.ss, e, t.ns, t.fromCache, t.rs, 
            /* excludesMetadataChanges= */ !0);
        }
        var o = !1;
        return this.Cf ? this.Nf(t) && (this.Df.next(t), o = !0) : this.kf(t, this.onlineState) && (this.$f(t), 
        o = !0), this.Ff = t, o;
    }, t.prototype.onError = function(t) {
        this.Df.error(t);
    }, 
    /** Returns whether a snapshot was raised. */ t.prototype.Sd = function(t) {
        this.onlineState = t;
        var e = !1;
        return this.Ff && !this.Cf && this.kf(this.Ff, t) && (this.$f(this.Ff), e = !0), 
        e;
    }, t.prototype.kf = function(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                var n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return !(this.options.Mf && n || t.docs.B() && "Offline" /* Offline */ !== e);
        // Raise data from cache if we have any documents or we are offline
        }, t.prototype.Nf = function(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        var e = this.Ff && this.Ff.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.rs && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }, t.prototype.$f = function(t) {
        t = he.os(t.query, t.docs, t.ns, t.fromCache), this.Cf = !0, this.Df.next(t);
    }, t;
}(), Oi = /** @class */ function() {
    function t() {}
    return t.prototype.vu = function(t) {
        this.Lf = t;
    }, t.prototype.Zn = function(t, e, n, r) {
        var i = this;
        // Queries that match all documents don't benefit from using
        // IndexFreeQueries. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
                return e.te() || n.isEqual(x.min()) ? this.Of(t, e) : this.Lf.Yn(t, r).next((function(o) {
            var u = i.xf(e, o);
            return (e.oe() || e.ae()) && i.pd(e.Bt, u, r, n) ? i.Of(t, e) : (Ae() <= s.DEBUG && De("IndexFreeQueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), e.toString()), 
            i.Lf.Zn(t, e, n).next((function(t) {
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                return u.forEach((function(e) {
                    t = t.Ae(e.key, e);
                })), t;
            })));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }, 
    /** Applies the query filter and sorting to the provided documents.  */ t.prototype.xf = function(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        var n = new Yt((function(e, n) {
            return t.se(e, n);
        }));
        return e.forEach((function(e, r) {
            r instanceof kt && t.matches(r) && (n = n.add(r));
        })), n;
    }, 
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion The version of the snapshot when the query
     * was last synchronized.
     */
    t.prototype.pd = function(t, e, n, r) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (n.size !== e.size) return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                var i = "F" /* First */ === t ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.S(r) > 0);
    }, t.prototype.Of = function(t, e) {
        return Ae() <= s.DEBUG && De("IndexFreeQueryEngine", "Using full collection scan to execute query: %s", e.toString()), 
        this.Lf.Zn(t, e, x.min());
    }, t;
}(), Pi = /** @class */ function() {
    function t(t, e) {
        this.jn = t, this.oo = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this.Wn = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.Bf = 1, 
        /** The last received stream token from the server, used to acknowledge which
             * responses the client has processed. Stream tokens are opaque checkpoint
             * markers whose only real value is their inclusion in the next request.
             */
        this.lastStreamToken = C.ht, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.qf = new Yt(yr.Ju);
    }
    return t.prototype.co = function(t) {
        return Be.resolve(0 === this.Wn.length);
    }, t.prototype._o = function(t, e, n) {
        var r = e.batchId, i = this.Uf(r, "acknowledged");
        return Ve(0 === i), 
        // Verify that the batch in the queue is the one to be acknowledged.
        this.Wn[i], this.lastStreamToken = n, Be.resolve();
    }, t.prototype.do = function(t) {
        return Be.resolve(this.lastStreamToken);
    }, t.prototype.fo = function(t, e) {
        return this.lastStreamToken = e, Be.resolve();
    }, t.prototype.To = function(t, e, n, r) {
        var i = this.Bf;
        this.Bf++, this.Wn.length > 0 && this.Wn[this.Wn.length - 1];
        var o = new Fe(i, e, n, r);
        this.Wn.push(o);
        // Track references by document key and index collection parents.
        for (var s = 0, u = r; s < u.length; s++) {
            var a = u[s];
            this.qf = this.qf.add(new yr(a.key, i)), this.jn.Io(t, a.key.path.M());
        }
        return Be.resolve(o);
    }, t.prototype.wo = function(t, e) {
        return Be.resolve(this.Qf(e));
    }, t.prototype.mo = function(t, e) {
        var n = e + 1, r = this.Wf(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return Be.resolve(this.Wn.length > i ? this.Wn[i] : null);
    }, t.prototype.Po = function() {
        return Be.resolve(0 === this.Wn.length ? -1 : this.Bf - 1);
    }, t.prototype.Vo = function(t) {
        return Be.resolve(this.Wn.slice());
    }, t.prototype.Gn = function(t, e) {
        var n = this, r = new yr(e, 0), i = new yr(e, Number.POSITIVE_INFINITY), o = [];
        return this.qf.Ke([ r, i ], (function(t) {
            var e = n.Qf(t.hc);
            o.push(e);
        })), Be.resolve(o);
    }, t.prototype.Xn = function(t, e) {
        var n = this, r = new Yt(Pe);
        return e.forEach((function(t) {
            var e = new yr(t, 0), i = new yr(t, Number.POSITIVE_INFINITY);
            n.qf.Ke([ e, i ], (function(t) {
                r = r.add(t.hc);
            }));
        })), Be.resolve(this.jf(r));
    }, t.prototype.nr = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                L.et(i) || (i = i.child(""));
        var o = new yr(new L(i), 0), s = new Yt(Pe);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                return this.qf.Ge((function(t) {
            var e = t.key.path;
            return !!n.q(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === r && (s = s.add(t.hc)), !0);
        }), o), Be.resolve(this.jf(s));
    }, t.prototype.jf = function(t) {
        var e = this, n = [];
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
                return t.forEach((function(t) {
            var r = e.Qf(t);
            null !== r && n.push(r);
        })), n;
    }, t.prototype.yo = function(t, e) {
        var n = this;
        Ve(0 === this.Uf(e.batchId, "removed")), this.Wn.shift();
        var r = this.qf;
        return Be.forEach(e.mutations, (function(i) {
            var o = new yr(i.key, e.batchId);
            return r = r.delete(o), n.oo.So(t, i.key);
        })).next((function() {
            n.qf = r;
        }));
    }, t.prototype.vo = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.Co = function(t, e) {
        var n = new yr(e, 0), r = this.qf.ze(n);
        return Be.resolve(e.isEqual(r && r.key));
    }, t.prototype.Do = function(t) {
        return this.Wn.length, Be.resolve();
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId The batchId to search for
     * @param action A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t.prototype.Uf = function(t, e) {
        return this.Wf(t);
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @return The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */
    t.prototype.Wf = function(t) {
        return 0 === this.Wn.length ? 0 : t - this.Wn[0].batchId;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        }, 
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t.prototype.Qf = function(t) {
        var e = this.Wf(t);
        return e < 0 || e >= this.Wn.length ? null : this.Wn[e];
    }, t;
}(), Li = /** @class */ function() {
    /**
     * @param sizer Used to assess the size of a document. For eager GC, this is expected to just
     * return 0 to avoid unnecessarily doing the work of calculating the size.
     */
    function t(t, e) {
        this.jn = t, this.Kf = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new Qt(L.N), 
        /** Size of all cached documents. */
        this.size = 0
        /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */;
    }
    return t.prototype.Nn = function(t, e, n) {
        var r = e.key, i = this.docs.get(r), o = i ? i.size : 0, s = this.Kf(e);
        return this.docs = this.docs.Ae(r, {
            ra: e,
            size: s,
            readTime: n
        }), this.size += s - o, this.jn.Io(t, r.path.M());
    }, 
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.$n = function(t) {
        var e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }, t.prototype.Mn = function(t, e) {
        var n = this.docs.get(e);
        return Be.resolve(n ? n.ra : null);
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Zt();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.Ae(t, e ? e.ra : null);
        })), Be.resolve(r);
    }, t.prototype.Zn = function(t, e, n) {
        for (var r = te(), i = new L(e.path.child("")), o = this.docs.ve(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.ke(); ) {
            var s = o.Ne(), u = s.key, a = s.value, h = a.ra, c = a.readTime;
            if (!e.path.q(u.path)) break;
            c.S(n) <= 0 || h instanceof kt && e.matches(h) && (r = r.Ae(h.key, h));
        }
        return Be.resolve(r);
    }, t.prototype.Gf = function(t, e) {
        return Be.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.Ea = function(e) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new t.Ia(this);
    }, t.prototype.Ra = function(t) {
        return Be.resolve(this.size);
    }, t;
}();

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
/**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */
Li.Ia = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).Aa = t, n;
    }
    return t(n, e), n.prototype.xn = function(t) {
        var e = this, n = [];
        return this.Dn.forEach((function(r, i) {
            i ? n.push(e.Aa.Nn(t, i, e.readTime)) : e.Aa.$n(r);
        })), Be.vn(n);
    }, n.prototype.Ln = function(t, e) {
        return this.Aa.Mn(t, e);
    }, n.prototype.On = function(t, e) {
        return this.Aa.getEntries(t, e);
    }, n;
}(Ge);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Ui = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.zf = new Ce((function(t) {
            return t.canonicalId();
        })), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = x.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.Hf = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this.Yf = new dr, this.targetCount = 0, this.Jf = Nn.No();
    }
    return t.prototype.js = function(t, e) {
        return this.zf.forEach((function(t, n) {
            return e(n);
        })), Be.resolve();
    }, t.prototype.Oo = function(t) {
        return Be.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.xo = function(t) {
        return Be.resolve(this.Hf);
    }, t.prototype.$o = function(t) {
        return this.highestTargetId = this.Jf.next(), Be.resolve(this.highestTargetId);
    }, t.prototype.Bo = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.Hf && (this.Hf = e), 
        Be.resolve();
    }, t.prototype.Uo = function(t) {
        this.zf.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.Jf = new Nn(e), this.highestTargetId = e), t.sequenceNumber > this.Hf && (this.Hf = t.sequenceNumber);
    }, t.prototype.qo = function(t, e) {
        return this.Uo(e), this.targetCount += 1, Be.resolve();
    }, t.prototype.Wo = function(t, e) {
        return this.Uo(e), Be.resolve();
    }, t.prototype.jo = function(t, e) {
        return this.zf.delete(e.target), this.Yf.ic(e.targetId), this.targetCount -= 1, 
        Be.resolve();
    }, t.prototype.$h = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.zf.forEach((function(s, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.zf.delete(s), o.push(r.Ko(t, u.targetId)), 
            i++);
        })), Be.vn(o).next((function() {
            return i;
        }));
    }, t.prototype.Ho = function(t) {
        return Be.resolve(this.targetCount);
    }, t.prototype.Yo = function(t, e) {
        var n = this.zf.get(e) || null;
        return Be.resolve(n);
    }, t.prototype.Jo = function(t, e, n) {
        return this.Yf.tc(e, n), Be.resolve();
    }, t.prototype.Zo = function(t, e, n) {
        this.Yf.sc(e, n);
        var r = this.persistence.oo, i = [];
        return r && e.forEach((function(e) {
            i.push(r.So(t, e));
        })), Be.vn(i);
    }, t.prototype.Ko = function(t, e) {
        return this.Yf.ic(e), Be.resolve();
    }, t.prototype.ea = function(t, e) {
        var n = this.Yf.rc(e);
        return Be.resolve(n);
    }, t.prototype.Co = function(t, e) {
        return Be.resolve(this.Yf.Co(e));
    }, t;
}(), qi = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t) {
        var e = this;
        this.Xf = {}, this.ja = new Ye(0), this.Da = !1, this.Da = !0, this.oo = t(this), 
        this.Oa = new Ui(this), this.jn = new Ln, this.Qn = new Li(this.jn, (function(t) {
            return e.oo.Zf(t);
        }));
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, t.prototype.hu = function() {
        // No durable state to ensure is closed on shutdown.
        return this.Da = !1, Promise.resolve();
    }, Object.defineProperty(t.prototype, "vh", {
        get: function() {
            return this.Da;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Ga = function() {
        // No op.
    }, t.prototype.Tu = function() {
        return this.jn;
    }, t.prototype.lu = function(t) {
        var e = this.Xf[t.s()];
        return e || (e = new Pi(this.jn, this.oo), this.Xf[t.s()] = e), e;
    }, t.prototype.du = function() {
        return this.Oa;
    }, t.prototype.fu = function() {
        return this.Qn;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        De("MemoryPersistence", "Starting transaction:", t);
        var i = new Mi(this.ja.next());
        return this.oo.tT(), n(i).next((function(t) {
            return r.oo.eT(i).next((function() {
                return t;
            }));
        })).yn().then((function(t) {
            return i.Un(), t;
        }));
    }, t.prototype.sT = function(t, e) {
        return Be.Sn(Object.values(this.Xf).map((function(n) {
            return function() {
                return n.Co(t, e);
            };
        })));
    }, t;
}(), Mi = /** @class */ function(e) {
    function n(t) {
        var n = this;
        return (n = e.call(this) || this).va = t, n;
    }
    return t(n, e), n;
}(Qe), Ci = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.iT = new dr, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.nT = null;
    }
    return t.rT = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "hT", {
        get: function() {
            if (this.nT) return this.nT;
            throw xe();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Xo = function(t, e, n) {
        return this.iT.Xo(n, e), this.hT.delete(n), Be.resolve();
    }, t.prototype.ta = function(t, e, n) {
        return this.iT.ta(n, e), this.hT.add(n), Be.resolve();
    }, t.prototype.So = function(t, e) {
        return this.hT.add(e), Be.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.iT.ic(e.targetId).forEach((function(t) {
            return n.hT.add(t);
        }));
        var r = this.persistence.du();
        return r.ea(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.hT.add(t);
            }));
        })).next((function() {
            return r.jo(t, e);
        }));
    }, t.prototype.tT = function() {
        this.nT = new Set;
    }, t.prototype.eT = function(t) {
        var e = this, n = this.persistence.fu().Ea();
        // Remove newly orphaned documents.
                return Be.forEach(this.hT, (function(r) {
            return e.oT(t, r).next((function(t) {
                t || n.$n(r);
            }));
        })).next((function() {
            return e.nT = null, n.apply(t);
        }));
    }, t.prototype.mu = function(t, e) {
        var n = this;
        return this.oT(t, e).next((function(t) {
            t ? n.hT.delete(e) : n.hT.add(e);
        }));
    }, t.prototype.Zf = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.oT = function(t, e) {
        var n = this;
        return Be.Sn([ function() {
            return Be.resolve(n.iT.Co(e));
        }, function() {
            return n.persistence.du().Co(t, e);
        }, function() {
            return n.persistence.sT(t, e);
        } ]);
    }, t;
}(), Fi = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            var e = this;
            return n(this, (function(n) {
                switch (n.label) {
                  case 0:
                    return this.qd = this.aT(t), this.persistence = this.uT(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return n.sent(), this.cT = this._T(t), this.F_ = this.lT(t), this.Nd = this.dT(t), 
                    this.hl = this.fT(t), this.TT = this.ET(t), this.qd.V_ = function(t) {
                        return e.hl.Sd(t, 1 /* SharedClientState */);
                    }, this.Nd.hl = this.hl, [ 4 /*yield*/ , this.F_.start() ];

                  case 2:
                    return n.sent(), [ 4 /*yield*/ , this.qd.start() ];

                  case 3:
                    return n.sent(), [ 4 /*yield*/ , this.Nd.start() ];

                  case 4:
                    return n.sent(), [ 4 /*yield*/ , this.Nd.Pl(this.hl.Zd) ];

                  case 5:
                    return n.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.ET = function(t) {
        return new Vi(this.hl);
    }, t.prototype._T = function(t) {
        return null;
    }, t.prototype.lT = function(t) {
        return new fr(this.persistence, new Oi, t.IT);
    }, t.prototype.uT = function(t) {
        return new qi(Ci.rT);
    }, t.prototype.dT = function(t) {
        var e = this;
        return new fi(this.F_, t.f_, t.br, (function(t) {
            return e.hl.Sd(t, 0 /* RemoteStore */);
        }), t.platform.wT());
    }, t.prototype.aT = function(t) {
        return new bi;
    }, t.prototype.fT = function(t) {
        return new ki(this.F_, this.Nd, this.qd, t.IT, t.Ud);
    }, t.prototype.clearPersistence = function(t) {
        throw new I(T.FAILED_PRECONDITION, "You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.");
    }, t;
}(), ji = /** @class */ function(r) {
    function i() {
        return null !== r && r.apply(this, arguments) || this;
    }
    return t(i, r), i.prototype.initialize = function(t) {
        return e(this, void 0, void 0, (function() {
            var i = this;
            return n(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return [ 4 /*yield*/ , r.prototype.initialize.call(this, t) ];

                  case 1:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return o.sent(), [ 4 /*yield*/ , this.persistence.Ka((function(t) {
                        return e(i, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , this.hl.Pl(t) ];

                                  case 1:
                                    return e.sent(), this.cT && (t && !this.cT.vh ? this.cT.start(this.F_) : t || this.cT.stop()), 
                                    [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })) ];

                  case 2:
                    // NOTE: This will immediately call the listener, so we make sure to
                    // set it after localStore / remoteStore are started.
                    return o.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, i.prototype.lT = function(t) {
        return new lr(this.persistence, new Oi, t.IT);
    }, i.prototype.fT = function(t) {
        var e = new Si(this.F_, this.Nd, this.qd, t.IT, t.Ud);
        return this.qd instanceof Ei && (this.qd.hl = e), e;
    }, i.prototype._T = function(t) {
        var e = this.persistence.oo.Vh;
        return new rn(e, t.br);
    }, i.prototype.uT = function(t) {
        var e = sr.Iu(t.RT), n = t.platform.yc(t.RT.ii);
        return new sr(t.AT.synchronizeTabs, e, t.clientId, t.platform, nn.Eh(t.AT.cacheSizeBytes), t.br, n, this.qd);
    }, i.prototype.aT = function(t) {
        if (t.AT.mT && t.AT.synchronizeTabs) {
            if (!Ei.Uh(t.platform)) throw new I(T.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
            var e = sr.Iu(t.RT);
            return new Ei(t.br, t.platform, e, t.clientId, t.IT);
        }
        return new bi;
    }, i.prototype.clearPersistence = function(t) {
        var e = sr.Iu(t);
        return sr.clearPersistence(e);
    }, i;
}(Fi), Bi = /** @class */ function() {
    function t(t, e, n, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    r) {
        this.platform = t, this.RT = e, this.credentials = n, this.br = r, this.clientId = Oe.cn()
        /**
     * Starts up the FirestoreClient, returning only whether or not enabling
     * persistence succeeded.
     *
     * The intent here is to "do the right thing" as far as users are concerned.
     * Namely, in cases where offline persistence is requested and possible,
     * enable it, but otherwise fall back to persistence disabled. For the most
     * part we expect this to succeed one way or the other so we don't expect our
     * users to actually wait on the firestore.enablePersistence Promise since
     * they generally won't care.
     *
     * Of course some users actually do care about whether or not persistence
     * was successfully enabled, so the Promise returned from this method
     * indicates this outcome.
     *
     * This presents a problem though: even before enablePersistence resolves or
     * rejects, users may have made calls to e.g. firestore.collection() which
     * means that the FirestoreClient in there will be available and will be
     * enqueuing actions on the async queue.
     *
     * Meanwhile any failure of an operation on the async queue causes it to
     * panic and reject any further work, on the premise that unhandled errors
     * are fatal.
     *
     * Consequently the fallback is handled internally here in start, and if the
     * fallback succeeds we signal success to the async queue even though the
     * start() itself signals failure.
     *
     * @param componentProvider Provider that returns all core components.
     * @param persistenceSettings Settings object to configure offline
     *     persistence.
     * @returns A deferred result indicating the user-visible result of enabling
     *     offline persistence. This method will reject this if IndexedDB fails to
     *     start for any reason. If usePersistence is false this is
     *     unconditionally resolved.
     */;
    }
    return t.prototype.start = function(t, e) {
        var n = this;
        this.PT();
        // We defer our initialization until we get the current user from
        // setChangeListener(). We block the async queue until we got the initial
        // user and the initialization is completed. This will prevent any scheduled
        // work from happening before initialization is completed.
        // If initializationDone resolved then the FirestoreClient is in a usable
        // state.
        var r = new He, i = new He, o = !1;
        // If usePersistence is true, certain classes of errors while starting are
        // recoverable but only by falling back to persistence disabled.
        // If there's an error in the first case but not in recovery we cannot
        // reject the promise blocking the async queue because this will cause the
        // async queue to panic.
                // Return only the result of enabling persistence. Note that this does not
        // need to await the completion of initializationDone because the result of
        // this method should not reflect any other kind of failure to start.
        return this.credentials.l((function(s) {
            if (!o) return o = !0, De("FirestoreClient", "Initializing. user=", s.uid), n.VT(t, e, s, i).then(r.resolve, r.reject);
            n.br.$r((function() {
                return n.ml(s);
            }));
        })), 
        // Block the async queue until initialization is done
        this.br.$r((function() {
            return r.promise;
        })), i.promise;
    }, 
    /** Enables the network connection and requeues all pending operations. */ t.prototype.enableNetwork = function() {
        var t = this;
        return this.PT(), this.br.enqueue((function() {
            return t.hl.enableNetwork();
        }));
    }, 
    /**
     * Initializes persistent storage, attempting to use IndexedDB if
     * usePersistence is true or memory-only if false.
     *
     * If IndexedDB fails because it's already open in another tab or because the
     * platform can't possibly support our implementation then this method rejects
     * the persistenceResult and falls back on memory-only persistence.
     *
     * @param componentProvider The provider that provides all core componennts
     *     for IndexedDB or memory-backed persistence
     * @param persistenceSettings Settings object to configure offline persistence
     * @param user The initial user
     * @param persistenceResult A deferred result indicating the user-visible
     *     result of enabling offline persistence. This method will reject this if
     *     IndexedDB fails to start for any reason. If usePersistence is false
     *     this is unconditionally resolved.
     * @returns a Promise indicating whether or not initialization should
     *     continue, i.e. that one of the persistence implementations actually
     *     succeeded.
     */
    t.prototype.VT = function(t, r, i, o) {
        return e(this, void 0, void 0, (function() {
            var s, u, a, h, c = this;
            return n(this, (function(f) {
                switch (f.label) {
                  case 0:
                    return f.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , this.platform.gT(this.RT) ];

                  case 1:
                    return s = f.sent(), u = this.platform.yc(this.RT.ii), a = function(t, e, n) {
                        return new ai(t, e, n);
                    }(s, this.credentials, u), [ 4 /*yield*/ , t.initialize({
                        br: this.br,
                        RT: this.RT,
                        platform: this.platform,
                        f_: a,
                        clientId: this.clientId,
                        IT: i,
                        Ud: 100,
                        AT: r
                    }) ];

                  case 2:
                    return f.sent(), this.persistence = t.persistence, this.qd = t.qd, this.F_ = t.F_, 
                    this.Nd = t.Nd, this.hl = t.hl, this.cT = t.cT, this.pT = t.TT, 
                    // When a user calls clearPersistence() in one client, all other clients
                    // need to be terminated to allow the delete to succeed.
                    this.persistence.Ga((function() {
                        return e(c, void 0, void 0, (function() {
                            return n(this, (function(t) {
                                switch (t.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , this.terminate() ];

                                  case 1:
                                    return t.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })), o.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    // An unknown failure on the first stage shuts everything down.
                    if (h = f.sent(), 
                    // Regardless of whether or not the retry succeeds, from an user
                    // perspective, offline persistence has failed.
                    o.reject(h), !this.yT(h)) throw h;
                    return [ 2 /*return*/ , (console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + h), 
                    this.VT(new Fi, {
                        mT: !1
                    }, i, o)) ];

                  case 4:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Decides whether the provided error allows us to gracefully disable
     * persistence (as opposed to crashing the client).
     */
    t.prototype.yT = function(t) {
        return "FirebaseError" === t.name ? t.code === T.FAILED_PRECONDITION || t.code === T.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || 
        // When the browser is out of quota we could get either quota exceeded
        // or an aborted error depending on whether the error happened during
        // schema migration.
        22 === t.code || 20 === t.code || 
        // Firefox Private Browsing mode disables IndexedDb and returns
        // INVALID_STATE for any usage.
        11 === t.code;
    }, 
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */
    t.prototype.PT = function() {
        if (this.br.Kr) throw new I(T.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.ml = function(t) {
        return this.br.th(), De("FirestoreClient", "Credential Changed. Current user: " + t.uid), 
        this.hl.ml(t);
    }, 
    /** Disables the network connection. Pending operations will not complete. */ t.prototype.disableNetwork = function() {
        var t = this;
        return this.PT(), this.br.enqueue((function() {
            return t.hl.disableNetwork();
        }));
    }, t.prototype.terminate = function() {
        var t = this;
        return this.br.Jr((function() {
            return e(t, void 0, void 0, (function() {
                return n(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        // PORTING NOTE: LocalStore does not need an explicit shutdown on web.
                        return this.cT && this.cT.stop(), [ 4 /*yield*/ , this.Nd.hu() ];

                      case 1:
                        return t.sent(), [ 4 /*yield*/ , this.qd.hu() ];

                      case 2:
                        return t.sent(), [ 4 /*yield*/ , this.persistence.hu() ];

                      case 3:
                        // PORTING NOTE: LocalStore does not need an explicit shutdown on web.
                        return t.sent(), 
                        // `removeChangeListener` must be called after shutting down the
                        // RemoteStore as it will prevent the RemoteStore from retrieving
                        // auth tokens.
                        this.credentials.T(), [ 2 /*return*/ ];
                    }
                }));
            }));
        }));
    }, 
    /**
     * Returns a Promise that resolves when all writes that were pending at the time this
     * method was called received server acknowledgement. An acknowledgement can be either acceptance
     * or rejection.
     */
    t.prototype.waitForPendingWrites = function() {
        var t = this;
        this.PT();
        var e = new He;
        return this.br.$r((function() {
            return t.hl._f(e);
        })), e.promise;
    }, t.prototype.listen = function(t, e, n) {
        var r = this;
        this.PT();
        var i = new Ri(t, e, n);
        return this.br.$r((function() {
            return r.pT.listen(i);
        })), i;
    }, t.prototype.nl = function(t) {
        var e = this;
        // Checks for termination but does not raise error, allowing unlisten after
        // termination to be a no-op.
                this.bT || this.br.$r((function() {
            return e.pT.nl(t);
        }));
    }, t.prototype.vT = function(t) {
        var e = this;
        return this.PT(), this.br.enqueue((function() {
            return e.F_.qu(t);
        })).then((function(t) {
            if (t instanceof kt) return t;
            if (t instanceof St) return null;
            throw new I(T.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)");
        }));
    }, t.prototype.ST = function(t) {
        var r = this;
        return this.PT(), this.br.enqueue((function() {
            return e(r, void 0, void 0, (function() {
                var e, r, i;
                return n(this, (function(n) {
                    switch (n.label) {
                      case 0:
                        return [ 4 /*yield*/ , this.F_.Wu(t, 
                        /* usePreviousResults= */ !0) ];

                      case 1:
                        return e = n.sent(), r = new Ni(t, e.ju), i = r.Pd(e.documents), [ 2 /*return*/ , r.xn(i, 
                        /* updateLimboDocuments= */ !1).snapshot ];
                    }
                }));
            }));
        }));
    }, t.prototype.write = function(t) {
        var e = this;
        this.PT();
        var n = new He;
        return this.br.$r((function() {
            return e.hl.write(t, n);
        })), n.promise;
    }, t.prototype.ii = function() {
        return this.RT.ii;
    }, t.prototype.vf = function(t) {
        var e = this;
        this.PT(), this.br.$r((function() {
            return e.pT.vf(t), Promise.resolve();
        }));
    }, t.prototype.Sf = function(t) {
        // Checks for shutdown but does not raise error, allowing remove after
        // shutdown to be a no-op.
        this.bT || this.pT.Sf(t);
    }, Object.defineProperty(t.prototype, "bT", {
        get: function() {
            // Technically, the asyncQueue is still running, but only accepting operations
            // related to termination or supposed to be run after termination. It is effectively
            // terminated to the eyes of users.
            return this.br.Kr;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.transaction = function(t) {
        var e = this;
        this.PT();
        var n = new He;
        return this.br.$r((function() {
            return e.hl.runTransaction(e.br, t, n), Promise.resolve();
        })), n.promise;
    }, t;
}(), Gi = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.DT(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.DT(this.observer.error, t);
    }, t.prototype.CT = function() {
        this.muted = !0;
    }, t.prototype.DT = function(t, e) {
        var n = this;
        this.muted || setTimeout((function() {
            n.muted || t(e);
        }), 0);
    }, t;
}();

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function zi(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        for (var n = t, r = 0, i = [ "next", "error", "complete" ]; r < i.length; r++) {
            var o = i[r];
            if (o in n && "function" == typeof n[o]) return !0;
        }
        return !1;
    }(t);
}

var Qi = /** @class */ function() {
    function t(t, e, n, r) {
        this.firestore = t, this.timestampsInSnapshots = e, this.FT = n, this.converter = r;
    }
    return t.prototype.NT = function(t) {
        switch (W(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return J(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.kT(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.$T(t);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return new Ur(tt(t.bytesValue));

          case 7 /* RefValue */ :
            return this.MT(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.LT(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.OT(t.arrayValue);

          case 10 /* ObjectValue */ :
            return this.xT(t.mapValue);

          default:
            throw xe();
        }
    }, t.prototype.xT = function(t) {
        var e = this, n = {};
        return q(t.fields || {}, (function(t, r) {
            n[t] = e.NT(r);
        })), n;
    }, t.prototype.LT = function(t) {
        return new Qr(J(t.latitude), J(t.longitude));
    }, t.prototype.OT = function(t) {
        var e = this;
        return (t.values || []).map((function(t) {
            return e.NT(t);
        }));
    }, t.prototype.$T = function(t) {
        switch (this.FT) {
          case "previous":
            var e = function t(e) {
                var n = e.mapValue.fields.__previous_value__;
                return G(n) ? t(n) : n;
            }(t);
            return null == e ? null : this.NT(e);

          case "estimate":
            return this.kT(z(t));

          default:
            return null;
        }
    }, t.prototype.kT = function(t) {
        var e = Z(t), n = new S(e.seconds, e.nanos);
        return this.timestampsInSnapshots ? n : n.toDate();
    }, t.prototype.MT = function(t) {
        var e = R.K(t);
        Ve(Te(e));
        var n = new Me(e.get(1), e.get(3)), r = new L(e.$(5));
        return n.isEqual(this.firestore.Nc) || 
        // TODO(b/64130202): Somehow support foreign references.
        ke("Document " + r + " contains a document reference within a different database (" + n.projectId + "/" + n.database + ") which is not supported. It will be treated as a reference in the current database (" + this.firestore.Nc.projectId + "/" + this.firestore.Nc.database + ") instead."), 
        new $i(r, this.firestore, this.converter);
    }, t;
}(), Wi = nn.Rh, Ki = /** @class */ function() {
    function t(t) {
        var e, n;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new I(T.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else Tr("settings", "non-empty string", "host", t.host), this.host = t.host, Ir("settings", "boolean", "ssl", t.ssl), 
        this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (Sr("settings", t, [ "host", "ssl", "credentials", "timestampsInSnapshots", "cacheSizeBytes", "experimentalForceLongPolling" ]), 
        Ir("settings", "object", "credentials", t.credentials), this.credentials = t.credentials, 
        Ir("settings", "boolean", "timestampsInSnapshots", t.timestampsInSnapshots), 
        // Nobody should set timestampsInSnapshots anymore, but the error depends on
        // whether they set it to true or false...
        !0 === t.timestampsInSnapshots ? ke("The setting 'timestampsInSnapshots: true' is no longer required and should be removed.") : !1 === t.timestampsInSnapshots && ke("Support for 'timestampsInSnapshots: false' will be removed soon. You must update your code to handle Timestamp objects."), 
        this.timestampsInSnapshots = null === (n = t.timestampsInSnapshots) || void 0 === n || n, 
        Ir("settings", "number", "cacheSizeBytes", t.cacheSizeBytes), void 0 === t.cacheSizeBytes) this.cacheSizeBytes = nn.mh; else {
            if (t.cacheSizeBytes !== Wi && t.cacheSizeBytes < nn.Ah) throw new I(T.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + nn.Ah);
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        Ir("settings", "boolean", "experimentalForceLongPolling", t.experimentalForceLongPolling), 
        this.forceLongPolling = void 0 !== t.experimentalForceLongPolling && t.experimentalForceLongPolling;
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.timestampsInSnapshots === t.timestampsInSnapshots && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.forceLongPolling === t.forceLongPolling;
    }, t;
}(), Yi = /** @class */ function() {
    // Note: We are using `MemoryComponentProvider` as a default
    // ComponentProvider to ensure backwards compatibility with the format
    // expected by the console build.
    function t(r, i, o) {
        var s = this;
        if (void 0 === o && (o = new Fi), this.BT = null, 
        // Public for use in tests.
        // TODO(mikelehen): Use modularized initialization instead.
        this.qT = new Ze, this.INTERNAL = {
            delete: function() {
                return e(s, void 0, void 0, (function() {
                    return n(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            // The client must be initalized to ensure that all subsequent API usage
                            // throws an exception.
                            return this.UT(), [ 4 /*yield*/ , this.QT.terminate() ];

                          case 1:
                            // The client must be initalized to ensure that all subsequent API usage
                            // throws an exception.
                            return t.sent(), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }
        }, "object" == typeof r.options) {
            // This is very likely a Firebase app object
            // TODO(b/34177605): Can we somehow use instanceof?
            var u = r;
            this.BT = u, this.Nc = t.WT(u), this.jT = u.name, this.KT = new _(i);
        } else {
            var a = r;
            if (!a.projectId) throw new I(T.INVALID_ARGUMENT, "Must provide projectId");
            this.Nc = new Me(a.projectId, a.database), 
            // Use a default persistenceKey that lines up with FirebaseApp.
            this.jT = "[DEFAULT]", this.KT = new A;
        }
        this.GT = o, this.zT = new Ki({}), this.HT = new $r(this.Nc);
    }
    return t.prototype.settings = function(t) {
        mr("Firestore.settings", arguments, 1), Er("Firestore.settings", "object", 1, t);
        var e = new Ki(t);
        if (this.QT && !this.zT.isEqual(e)) throw new I(T.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.");
        this.zT = e, void 0 !== e.credentials && (this.KT = function(t) {
            if (!t) return new A;
            switch (t.type) {
              case "gapi":
                var e = t.YT;
                // Make sure this really is a Gapi client.
                                return Ve(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new k(e, t.V || "0");

              case "provider":
                return t.YT;

              default:
                throw new I(T.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
            }
        }(e.credentials));
    }, t.prototype.enableNetwork = function() {
        return this.UT(), this.QT.enableNetwork();
    }, t.prototype.disableNetwork = function() {
        return this.UT(), this.QT.disableNetwork();
    }, t.prototype.enablePersistence = function(t) {
        var e, n;
        if (this.QT) throw new I(T.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.");
        var r = !1;
        return t && (void 0 !== t.experimentalTabSynchronization && ke("The 'experimentalTabSynchronization' setting will be removed. Use 'synchronizeTabs' instead."), 
        r = null !== (n = null !== (e = t.synchronizeTabs) && void 0 !== e ? e : t.experimentalTabSynchronization) && void 0 !== n && n), 
        this.JT(this.GT, {
            mT: !0,
            cacheSizeBytes: this.zT.cacheSizeBytes,
            synchronizeTabs: r
        });
    }, t.prototype.clearPersistence = function() {
        return e(this, void 0, void 0, (function() {
            var t, r = this;
            return n(this, (function(i) {
                if (void 0 !== this.QT && !this.QT.bT) throw new I(T.FAILED_PRECONDITION, "Persistence cannot be cleared after this Firestore instance is initialized.");
                return t = new He, [ 2 /*return*/ , (this.qT.Gr((function() {
                    return e(r, void 0, void 0, (function() {
                        var e, r;
                        return n(this, (function(n) {
                            switch (n.label) {
                              case 0:
                                return n.trys.push([ 0, 2, , 3 ]), e = this.XT(), [ 4 /*yield*/ , this.GT.clearPersistence(e) ];

                              case 1:
                                return n.sent(), t.resolve(), [ 3 /*break*/ , 3 ];

                              case 2:
                                return r = n.sent(), t.reject(r), [ 3 /*break*/ , 3 ];

                              case 3:
                                return [ 2 /*return*/ ];
                            }
                        }));
                    }));
                })), t.promise) ];
            }));
        }));
    }, t.prototype.terminate = function() {
        return this.app._removeServiceInstance("firestore"), this.INTERNAL.delete();
    }, Object.defineProperty(t.prototype, "ZT", {
        get: function() {
            return this.UT(), this.QT.bT;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.waitForPendingWrites = function() {
        return this.UT(), this.QT.waitForPendingWrites();
    }, t.prototype.onSnapshotsInSync = function(t) {
        if (this.UT(), zi(t)) return this.tE(t);
        Er("Firestore.onSnapshotsInSync", "function", 1, t);
        var e = {
            next: t
        };
        return this.tE(e);
    }, t.prototype.tE = function(t) {
        var e = this, n = new Gi({
            next: function() {
                t.next && t.next();
            },
            error: function(t) {
                throw xe();
            }
        });
        return this.QT.vf(n), function() {
            n.CT(), e.QT.Sf(n);
        };
    }, t.prototype.UT = function() {
        return this.QT || 
        // Kick off starting the client but don't actually wait for it.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.JT(new Fi, {
            mT: !1
        }), this.QT;
    }, t.prototype.XT = function() {
        return new qe(this.Nc, this.jT, this.zT.host, this.zT.ssl, this.zT.forceLongPolling);
    }, t.prototype.JT = function(t, e) {
        var n = this.XT();
        return this.QT = new Bi(Ie.nt(), n, this.KT, this.qT), this.QT.start(t, e);
    }, t.WT = function(t) {
        if (e = t.options, "projectId", !Object.prototype.hasOwnProperty.call(e, "projectId")) throw new I(T.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
        var e, n = t.options.projectId;
        /**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
        /**
 * Helper function to prevent instantiation through the constructor.
 *
 * This method creates a new constructor that throws when it's invoked.
 * The prototype of that constructor is then set to the prototype of the hidden
 * "class" to expose all the prototype methods and allow for instanceof
 * checks.
 *
 * To also make all the static methods available, all properties of the
 * original constructor are copied to the new constructor.
 */        if (!n || "string" != typeof n) throw new I(T.INVALID_ARGUMENT, "projectId must be a string in FirebaseApp.options");
        return new Me(n);
    }, Object.defineProperty(t.prototype, "app", {
        get: function() {
            if (!this.BT) throw new I(T.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.BT;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.collection = function(t) {
        return mr("Firestore.collection", arguments, 1), Er("Firestore.collection", "non-empty string", 1, t), 
        this.UT(), new ro(R.K(t), this);
    }, t.prototype.doc = function(t) {
        return mr("Firestore.doc", arguments, 1), Er("Firestore.doc", "non-empty string", 1, t), 
        this.UT(), $i.eE(R.K(t), this);
    }, t.prototype.collectionGroup = function(t) {
        if (mr("Firestore.collectionGroup", arguments, 1), Er("Firestore.collectionGroup", "non-empty string", 1, t), 
        t.indexOf("/") >= 0) throw new I(T.INVALID_ARGUMENT, "Invalid collection ID '" + t + "' passed to function Firestore.collectionGroup(). Collection IDs must not contain '/'.");
        return this.UT(), new eo(new Rt(R.G, t), this);
    }, t.prototype.runTransaction = function(t) {
        var e = this;
        return mr("Firestore.runTransaction", arguments, 1), Er("Firestore.runTransaction", "function", 1, t), 
        this.UT().transaction((function(n) {
            return t(new Hi(e, n));
        }));
    }, t.prototype.batch = function() {
        return this.UT(), new Xi(this);
    }, Object.defineProperty(t, "logLevel", {
        get: function() {
            switch (Ae()) {
              case s.DEBUG:
                return "debug";

              case s.SILENT:
                return "silent";

              default:
                // The default log level is error
                return "error";
            }
        },
        enumerable: !0,
        configurable: !0
    }), t.setLogLevel = function(t) {
        switch (mr("Firestore.setLogLevel", arguments, 1), Er("Firestore.setLogLevel", "non-empty string", 1, t), 
        t) {
          case "debug":
            _e(s.DEBUG);
            break;

          case "error":
            _e(s.ERROR);
            break;

          case "silent":
            _e(s.SILENT);
            break;

          default:
            throw new I(T.INVALID_ARGUMENT, "Invalid log level: " + t);
        }
    }, 
    // Note: this is not a property because the minifier can't work correctly with
    // the way TypeScript compiler outputs properties.
    t.prototype.sE = function() {
        return this.zT.timestampsInSnapshots;
    }, t;
}(), Hi = /** @class */ function() {
    function t(t, e) {
        this.iE = t, this.nE = e;
    }
    return t.prototype.get = function(t) {
        var e = this;
        mr("Transaction.get", arguments, 1);
        var n = uo("Transaction.get", t, this.iE);
        return this.nE.R_([ n.kc ]).then((function(t) {
            if (!t || 1 !== t.length) return xe();
            var r = t[0];
            if (r instanceof St) return new Ji(e.iE, n.kc, null, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, n.rE);
            if (r instanceof kt) return new Ji(e.iE, n.kc, r, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, n.rE);
            throw xe();
        }));
    }, t.prototype.set = function(t, e, n) {
        wr("Transaction.set", arguments, 2, 3);
        var r = uo("Transaction.set", t, this.iE);
        n = io("Transaction.set", n);
        var i = ho(r.rE, e, "Transaction.set"), o = i[0], s = i[1], u = n.merge || n.mergeFields ? this.iE.HT.Sc(s, o, n.mergeFields) : this.iE.HT.bc(s, o);
        return this.nE.set(r.kc, u), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        return "string" == typeof e || e instanceof qr ? (gr("Transaction.update", arguments, 3), 
        r = uo("Transaction.update", t, this.iE), i = this.iE.HT.Cc("Transaction.update", e, n, o)) : (mr("Transaction.update", arguments, 2), 
        r = uo("Transaction.update", t, this.iE), i = this.iE.HT.Dc("Transaction.update", e)), 
        this.nE.update(r.kc, i), this;
    }, t.prototype.delete = function(t) {
        mr("Transaction.delete", arguments, 1);
        var e = uo("Transaction.delete", t, this.iE);
        return this.nE.delete(e.kc), this;
    }, t;
}(), Xi = /** @class */ function() {
    function t(t) {
        this.iE = t, this.hE = [], this.oE = !1;
    }
    return t.prototype.set = function(t, e, n) {
        wr("WriteBatch.set", arguments, 2, 3), this.aE();
        var r = uo("WriteBatch.set", t, this.iE);
        n = io("WriteBatch.set", n);
        var i = ho(r.rE, e, "WriteBatch.set"), o = i[0], s = i[1], u = n.merge || n.mergeFields ? this.iE.HT.Sc(s, o, n.mergeFields) : this.iE.HT.bc(s, o);
        return this.hE = this.hE.concat(u.Rc(r.kc, yt.ft())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        return this.aE(), "string" == typeof e || e instanceof qr ? (gr("WriteBatch.update", arguments, 3), 
        r = uo("WriteBatch.update", t, this.iE), i = this.iE.HT.Cc("WriteBatch.update", e, n, o)) : (mr("WriteBatch.update", arguments, 2), 
        r = uo("WriteBatch.update", t, this.iE), i = this.iE.HT.Dc("WriteBatch.update", e)), 
        this.hE = this.hE.concat(i.Rc(r.kc, yt.exists(!0))), this;
    }, t.prototype.delete = function(t) {
        mr("WriteBatch.delete", arguments, 1), this.aE();
        var e = uo("WriteBatch.delete", t, this.iE);
        return this.hE = this.hE.concat(new Et(e.kc, yt.ft())), this;
    }, t.prototype.commit = function() {
        return this.aE(), this.oE = !0, this.hE.length > 0 ? this.iE.UT().write(this.hE) : Promise.resolve();
    }, t.prototype.aE = function() {
        if (this.oE) throw new I(T.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t;
}(), $i = /** @class */ function() {
    function t(t, e, n) {
        this.kc = t, this.firestore = e, this.rE = n, this.QT = this.firestore.UT();
    }
    return t.eE = function(e, n, r) {
        if (e.length % 2 != 0) throw new I(T.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + e.j() + " has " + e.length);
        return new t(new L(e), n, r);
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this.kc.path.O();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        get: function() {
            return new ro(this.kc.path.M(), this.firestore, this.rE);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.kc.path.j();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.collection = function(t) {
        if (mr("DocumentReference.collection", arguments, 1), Er("DocumentReference.collection", "non-empty string", 1, t), 
        !t) throw new I(T.INVALID_ARGUMENT, "Must provide a non-empty collection name to collection()");
        var e = R.K(t);
        return new ro(this.kc.path.child(e), this.firestore);
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw xr("isEqual", "DocumentReference", 1, e);
        return this.firestore === e.firestore && this.kc.isEqual(e.kc) && this.rE === e.rE;
    }, t.prototype.set = function(t, e) {
        wr("DocumentReference.set", arguments, 1, 2), e = io("DocumentReference.set", e);
        var n = ho(this.rE, t, "DocumentReference.set"), r = n[0], i = n[1], o = e.merge || e.mergeFields ? this.firestore.HT.Sc(i, r, e.mergeFields) : this.firestore.HT.bc(i, r);
        return this.QT.write(o.Rc(this.kc, yt.ft()));
    }, t.prototype.update = function(t, e) {
        for (var n, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return "string" == typeof t || t instanceof qr ? (gr("DocumentReference.update", arguments, 2), 
        n = this.firestore.HT.Cc("DocumentReference.update", t, e, r)) : (mr("DocumentReference.update", arguments, 1), 
        n = this.firestore.HT.Dc("DocumentReference.update", t)), this.QT.write(n.Rc(this.kc, yt.exists(!0)));
    }, t.prototype.delete = function() {
        return mr("DocumentReference.delete", arguments, 0), this.QT.write([ new Et(this.kc, yt.ft()) ]);
    }, t.prototype.onSnapshot = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        wr("DocumentReference.onSnapshot", arguments, 1, 4);
        var n, r = {
            includeMetadataChanges: !1
        }, i = 0;
        "object" != typeof t[i] || zi(t[i]) || (Sr("DocumentReference.onSnapshot", r = t[i], [ "includeMetadataChanges" ]), 
        Ir("DocumentReference.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), 
        i++);
        var o = {
            includeMetadataChanges: r.includeMetadataChanges
        };
        return zi(t[i]) ? n = t[i] : (Er("DocumentReference.onSnapshot", "function", i, t[i]), 
        br("DocumentReference.onSnapshot", "function", i + 1, t[i + 1]), br("DocumentReference.onSnapshot", "function", i + 2, t[i + 2]), 
        n = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.uE(o, n);
    }, t.prototype.uE = function(t, e) {
        var n = this, r = function(t) {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (r = e.error.bind(e));
        var i = new Gi({
            next: function(t) {
                if (e.next) {
                    var r = t.docs.get(n.kc);
                    e.next(new Ji(n.firestore, n.kc, r, t.fromCache, t.hasPendingWrites, n.rE));
                }
            },
            error: r
        }), o = this.QT.listen(Rt.Wt(this.kc.path), i, t);
        return function() {
            i.CT(), n.QT.nl(o);
        };
    }, t.prototype.get = function(t) {
        var e = this;
        return wr("DocumentReference.get", arguments, 0, 1), so("DocumentReference.get", t), 
        new Promise((function(n, r) {
            t && "cache" === t.source ? e.firestore.UT().vT(e.kc).then((function(t) {
                n(new Ji(e.firestore, e.kc, t, 
                /*fromCache=*/ !0, t instanceof kt && t.At, e.rE));
            }), r) : e.cE(n, r, t);
        }));
    }, t.prototype.cE = function(t, e, n) {
        var r = this.uE({
            includeMetadataChanges: !0,
            Mf: !0
        }, {
            next: function(i) {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                r(), !i.exists && i.metadata.fromCache ? 
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                e(new I(T.UNAVAILABLE, "Failed to get document because the client is offline.")) : i.exists && i.metadata.fromCache && n && "server" === n.source ? e(new I(T.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : t(i);
            },
            error: e
        });
    }, t.prototype.withConverter = function(e) {
        return new t(this.kc, this.firestore, e);
    }, t;
}(), Zi = /** @class */ function() {
    function t(t, e) {
        this.hasPendingWrites = t, this.fromCache = e;
    }
    return t.prototype.isEqual = function(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }, t;
}(), Ji = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.iE = t, this.kc = e, this._E = n, this.lE = r, this.dE = i, this.rE = o;
    }
    return t.prototype.data = function(t) {
        if (wr("DocumentSnapshot.data", arguments, 0, 1), t = oo("DocumentSnapshot.data", t), 
        this._E) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            if (this.rE) {
                var e = new to(this.iE, this.kc, this._E, this.lE, this.dE);
                return this.rE.fromFirestore(e, t);
            }
            return new Qi(this.iE, this.iE.sE(), t.serverTimestamps, 
            /* converter= */ void 0).NT(this._E.Mt());
        }
    }, t.prototype.get = function(t, e) {
        if (wr("DocumentSnapshot.get", arguments, 1, 2), e = oo("DocumentSnapshot.get", e), 
        this._E) {
            var n = this._E.data().field(ni("DocumentSnapshot.get", t));
            if (null !== n) return new Qi(this.iE, this.iE.sE(), e.serverTimestamps, this.rE).NT(n);
        }
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this.kc.path.O();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ref", {
        get: function() {
            return new $i(this.kc, this.iE, this.rE);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "exists", {
        get: function() {
            return null !== this._E;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "metadata", {
        get: function() {
            return new Zi(this.dE, this.lE);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw xr("isEqual", "DocumentSnapshot", 1, e);
        return this.iE === e.iE && this.lE === e.lE && this.kc.isEqual(e.kc) && (null === this._E ? null === e._E : this._E.isEqual(e._E)) && this.rE === e.rE;
    }, t;
}(), to = /** @class */ function(e) {
    function n() {
        return null !== e && e.apply(this, arguments) || this;
    }
    return t(n, e), n.prototype.data = function(t) {
        return e.prototype.data.call(this, t);
    }, n;
}(Ji), eo = /** @class */ function() {
    function t(t, e, n) {
        this.fE = t, this.firestore = e, this.rE = n;
    }
    return t.prototype.where = function(e, n, r) {
        mr("Query.where", arguments, 3), kr("Query.where", 3, r);
        // Enumerated from the WhereFilterOp type in index.d.ts.
        var i, o = function(t, e, n, r) {
            if (!e.some((function(t) {
                return t === r;
            }))) throw new I(T.INVALID_ARGUMENT, "Invalid value " + Dr(r) + " provided to function Query.where() for its " + Rr(2) + " argument. Acceptable values: " + e.join(", "));
            return r;
        }(0, [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , "==" /* EQUAL */ , ">=" /* GREATER_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , "array-contains" /* ARRAY_CONTAINS */ , "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], 0, n), s = ni("Query.where", e);
        if (s.Y()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === o || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o) throw new I(T.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId().");
            if ("in" /* IN */ === o) {
                this.TE(r, o);
                for (var u = [], a = 0, h = r; a < h.length; a++) {
                    var c = h[a];
                    u.push(this.EE(c));
                }
                i = {
                    arrayValue: {
                        values: u
                    }
                };
            } else i = this.EE(r);
        } else "in" /* IN */ !== o && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== o || this.TE(r, o), 
        i = this.firestore.HT.Fc("Query.where", r, 
        // We only allow nested arrays for IN queries.
        /** allowArrays = */ "in" /* IN */ === o);
        var f = Ot.create(s, o, i);
        return this.IE(f), new t(this.fE.Gt(f), this.firestore, this.rE);
    }, t.prototype.orderBy = function(e, n) {
        var r;
        if (wr("Query.orderBy", arguments, 1, 2), br("Query.orderBy", "non-empty string", 2, n), 
        void 0 === n || "asc" === n) r = "asc" /* ASCENDING */; else {
            if ("desc" !== n) throw new I(T.INVALID_ARGUMENT, "Function Query.orderBy() has unknown direction '" + n + "', expected 'asc' or 'desc'.");
            r = "desc" /* DESCENDING */;
        }
        if (null !== this.fE.startAt) throw new I(T.INVALID_ARGUMENT, "Invalid query. You must not call Query.startAt() or Query.startAfter() before calling Query.orderBy().");
        if (null !== this.fE.endAt) throw new I(T.INVALID_ARGUMENT, "Invalid query. You must not call Query.endAt() or Query.endBefore() before calling Query.orderBy().");
        var i = ni("Query.orderBy", e), o = new Ft(i, r);
        return this.wE(o), new t(this.fE.zt(o), this.firestore, this.rE);
    }, t.prototype.limit = function(e) {
        return mr("Query.limit", arguments, 1), Er("Query.limit", "number", 1, e), Vr("Query.limit", 1, e), 
        new t(this.fE.Ht(e), this.firestore, this.rE);
    }, t.prototype.limitToLast = function(e) {
        return mr("Query.limitToLast", arguments, 1), Er("Query.limitToLast", "number", 1, e), 
        Vr("Query.limitToLast", 1, e), new t(this.fE.Yt(e), this.firestore, this.rE);
    }, t.prototype.startAt = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        gr("Query.startAt", arguments, 1);
        var i = this.RE("Query.startAt", e, n, 
        /*before=*/ !0);
        return new t(this.fE.Jt(i), this.firestore, this.rE);
    }, t.prototype.startAfter = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        gr("Query.startAfter", arguments, 1);
        var i = this.RE("Query.startAfter", e, n, 
        /*before=*/ !1);
        return new t(this.fE.Jt(i), this.firestore, this.rE);
    }, t.prototype.endBefore = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        gr("Query.endBefore", arguments, 1);
        var i = this.RE("Query.endBefore", e, n, 
        /*before=*/ !0);
        return new t(this.fE.Xt(i), this.firestore, this.rE);
    }, t.prototype.endAt = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        gr("Query.endAt", arguments, 1);
        var i = this.RE("Query.endAt", e, n, 
        /*before=*/ !1);
        return new t(this.fE.Xt(i), this.firestore, this.rE);
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw xr("isEqual", "Query", 1, e);
        return this.firestore === e.firestore && this.fE.isEqual(e.fE);
    }, t.prototype.withConverter = function(e) {
        return new t(this.fE, this.firestore, e);
    }, 
    /** Helper function to create a bound from a document or fields */ t.prototype.RE = function(t, e, n, r) {
        if (kr(t, 1, e), e instanceof Ji) {
            if (n.length > 0) throw new I(T.INVALID_ARGUMENT, "Too many arguments provided to " + t + "().");
            var i = e;
            if (!i.exists) throw new I(T.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + t + "().");
            return this.AE(i._E, r);
        }
        var o = [ e ].concat(n);
        return this.mE(t, o, r);
    }, 
    /**
     * Create a Bound from a query and a document.
     *
     * Note that the Bound will always include the key of the document
     * and so only the provided document will compare equal to the returned
     * position.
     *
     * Will throw if the document does not contain all fields of the order by
     * of the query or if any of the fields in the order by are an uncommitted
     * server timestamp.
     */
    t.prototype.AE = function(t, e) {
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var n = [], r = 0, i = this.fE.orderBy; r < i.length; r++) {
            var o = i[r];
            if (o.field.Y()) n.push(et(this.firestore.Nc, t.key)); else {
                var s = t.field(o.field);
                if (G(s)) throw new I(T.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + o.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === s) {
                    var u = o.field.j();
                    throw new I(T.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + u + "' (used as the orderBy) does not exist.");
                }
                n.push(s);
            }
        }
        return new Ct(n, e);
    }, 
    /**
     * Converts a list of field values to a Bound for the given query.
     */
    t.prototype.mE = function(t, e, n) {
        // Use explicit order by's because it has to match the query the user made
        var r = this.fE.xt;
        if (e.length > r.length) throw new I(T.INVALID_ARGUMENT, "Too many arguments provided to " + t + "(). The number of arguments must be less than or equal to the number of Query.orderBy() clauses");
        for (var i = [], o = 0; o < e.length; o++) {
            var s = e[o];
            if (r[o].field.Y()) {
                if ("string" != typeof s) throw new I(T.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + t + "(), but got a " + typeof s);
                if (!this.fE._e() && -1 !== s.indexOf("/")) throw new I(T.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + t + "() must be a plain document ID, but '" + s + "' contains a slash.");
                var u = this.fE.path.child(R.K(s));
                if (!L.et(u)) throw new I(T.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + t + "() must result in a valid document path, but '" + u + "' is not because it contains an odd number of segments.");
                var a = new L(u);
                i.push(et(this.firestore.Nc, a));
            } else {
                var h = this.firestore.HT.Fc(t, s);
                i.push(h);
            }
        }
        return new Ct(i, n);
    }, t.prototype.onSnapshot = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        wr("Query.onSnapshot", arguments, 1, 4);
        var n, r = {}, i = 0;
        return "object" != typeof t[i] || zi(t[i]) || (Sr("Query.onSnapshot", r = t[i], [ "includeMetadataChanges" ]), 
        Ir("Query.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), 
        i++), zi(t[i]) ? n = t[i] : (Er("Query.onSnapshot", "function", i, t[i]), br("Query.onSnapshot", "function", i + 1, t[i + 1]), 
        br("Query.onSnapshot", "function", i + 2, t[i + 2]), n = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.PE(this.fE), this.uE(r, n);
    }, t.prototype.uE = function(t, e) {
        var n = this, r = function(t) {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (r = e.error.bind(e));
        var i = new Gi({
            next: function(t) {
                e.next && e.next(new no(n.firestore, n.fE, t, n.rE));
            },
            error: r
        }), o = this.firestore.UT(), s = o.listen(this.fE, i, t);
        return function() {
            i.CT(), o.nl(s);
        };
    }, t.prototype.PE = function(t) {
        if (t.ae() && 0 === t.xt.length) throw new I(T.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }, t.prototype.get = function(t) {
        var e = this;
        return wr("Query.get", arguments, 0, 1), so("Query.get", t), this.PE(this.fE), new Promise((function(n, r) {
            t && "cache" === t.source ? e.firestore.UT().ST(e.fE).then((function(t) {
                n(new no(e.firestore, e.fE, t, e.rE));
            }), r) : e.cE(n, r, t);
        }));
    }, t.prototype.cE = function(t, e, n) {
        var r = this.uE({
            includeMetadataChanges: !0,
            Mf: !0
        }, {
            next: function(i) {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                r(), i.metadata.fromCache && n && "server" === n.source ? e(new I(T.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : t(i);
            },
            error: e
        });
    }, 
    /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */
    t.prototype.EE = function(t) {
        if ("string" == typeof t) {
            if ("" === t) throw new I(T.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!this.fE._e() && -1 !== t.indexOf("/")) throw new I(T.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + t + "' contains a '/' character.");
            var e = this.fE.path.child(R.K(t));
            if (!L.et(e)) throw new I(T.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + e + "' is not because it has an odd number of segments (" + e.length + ").");
            return et(this.firestore.Nc, new L(e));
        }
        if (t instanceof $i) {
            var n = t;
            return et(this.firestore.Nc, n.kc);
        }
        throw new I(T.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Dr(t) + ".");
    }, 
    /**
     * Validates that the value passed into a disjunctrive filter satisfies all
     * array requirements.
     */
    t.prototype.TE = function(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new I(T.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
        if (t.length > 10) throw new I(T.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
        if (t.indexOf(null) >= 0) throw new I(T.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'null' in the value array.");
        if (t.filter((function(t) {
            return Number.isNaN(t);
        })).length > 0) throw new I(T.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'NaN' in the value array.");
    }, t.prototype.IE = function(t) {
        if (t instanceof Ot) {
            var e = [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], n = [ "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], r = e.indexOf(t.op) >= 0, i = n.indexOf(t.op) >= 0;
            if (t.ue()) {
                var o = this.fE.jt();
                if (null !== o && !o.isEqual(t.field)) throw new I(T.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '" + o.toString() + "' and '" + t.field.toString() + "'");
                var s = this.fE.Kt();
                null !== s && this.VE(t.field, s);
            } else if (i || r) {
                // You can have at most 1 disjunctive filter and 1 array filter. Check if
                // the new filter conflicts with an existing one.
                var u = null;
                if (i && (u = this.fE.ce(n)), null === u && r && (u = this.fE.ce(e)), null != u) 
                // We special case when it's a duplicate op to give a slightly clearer error message.
                throw u === t.op ? new I(T.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + t.op.toString() + "' filter.") : new I(T.INVALID_ARGUMENT, "Invalid query. You cannot use '" + t.op.toString() + "' filters with '" + u.toString() + "' filters.");
            }
        }
    }, t.prototype.wE = function(t) {
        if (null === this.fE.Kt()) {
            // This is the first order by. It must match any inequality.
            var e = this.fE.jt();
            null !== e && this.VE(e, t.field);
        }
    }, t.prototype.VE = function(t, e) {
        if (!e.isEqual(t)) throw new I(T.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '" + t.toString() + "' and so you must also use '" + t.toString() + "' as your first Query.orderBy(), but your first Query.orderBy() is on field '" + e.toString() + "' instead.");
    }, t;
}(), no = /** @class */ function() {
    function t(t, e, n, r) {
        this.iE = t, this.gE = e, this.pE = n, this.rE = r, this.yE = null, this.bE = null, 
        this.metadata = new Zi(n.hasPendingWrites, n.fromCache);
    }
    return Object.defineProperty(t.prototype, "docs", {
        get: function() {
            var t = [];
            return this.forEach((function(e) {
                return t.push(e);
            })), t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "empty", {
        get: function() {
            return this.pE.docs.B();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.pE.docs.size;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.forEach = function(t, e) {
        var n = this;
        wr("QuerySnapshot.forEach", arguments, 1, 2), Er("QuerySnapshot.forEach", "function", 1, t), 
        this.pE.docs.forEach((function(r) {
            t.call(e, n.vE(r));
        }));
    }, Object.defineProperty(t.prototype, "query", {
        get: function() {
            return new eo(this.gE, this.iE, this.rE);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.docChanges = function(t) {
        t && (Sr("QuerySnapshot.docChanges", t, [ "includeMetadataChanges" ]), Ir("QuerySnapshot.docChanges", "boolean", "includeMetadataChanges", t.includeMetadataChanges));
        var e = !(!t || !t.includeMetadataChanges);
        if (e && this.pE.hs) throw new I(T.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this.yE && this.bE === e || (this.yE = 
        /**
     * Calculates the array of firestore.DocumentChange's for a given ViewSnapshot.
     *
     * Exported for testing.
     */
        function(t, e, n, r) {
            if (n.ss.B()) {
                // Special case the first snapshot because index calculation is easy and
                // fast
                var i = 0;
                return n.docChanges.map((function(e) {
                    var o = new to(t, e.doc.key, e.doc, n.fromCache, n.ns.has(e.doc.key), r);
                    return e.doc, {
                        type: "added",
                        doc: o,
                        oldIndex: -1,
                        newIndex: i++
                    };
                }));
            }
            // A DocumentSet that is updated incrementally as changes are applied to use
            // to lookup the index of a document.
            var o = n.ss;
            return n.docChanges.filter((function(t) {
                return e || 3 /* Metadata */ !== t.type;
            })).map((function(e) {
                var i = new to(t, e.doc.key, e.doc, n.fromCache, n.ns.has(e.doc.key), r), s = -1, u = -1;
                return 0 /* Added */ !== e.type && (s = o.indexOf(e.doc.key), o = o.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (u = (o = o.add(e.doc)).indexOf(e.doc.key)), {
                    type: ao(e.type),
                    doc: i,
                    oldIndex: s,
                    newIndex: u
                };
            }));
        }(this.iE, e, this.pE, this.rE), this.bE = e), this.yE;
    }, 
    /** Check the equality. The call can be very expensive. */ t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw xr("isEqual", "QuerySnapshot", 1, e);
        return this.iE === e.iE && this.gE.isEqual(e.gE) && this.pE.isEqual(e.pE) && this.rE === e.rE;
    }, t.prototype.vE = function(t) {
        return new to(this.iE, t.key, t, this.metadata.fromCache, this.pE.ns.has(t.key), this.rE);
    }, t;
}(), ro = /** @class */ function(e) {
    function n(t, n, r) {
        var i = this;
        if ((i = e.call(this, Rt.Wt(t), n, r) || this).SE = t, t.length % 2 != 1) throw new I(T.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + t.j() + " has " + t.length);
        return i;
    }
    return t(n, e), Object.defineProperty(n.prototype, "id", {
        get: function() {
            return this.fE.path.O();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        get: function() {
            var t = this.fE.path.M();
            return t.B() ? null : new $i(new L(t), this.firestore);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        get: function() {
            return this.fE.path.j();
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.doc = function(t) {
        if (wr("CollectionReference.doc", arguments, 0, 1), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        0 === arguments.length && (t = Oe.cn()), Er("CollectionReference.doc", "non-empty string", 1, t), 
        "" === t) throw new I(T.INVALID_ARGUMENT, "Document path must be a non-empty string");
        var e = R.K(t);
        return $i.eE(this.fE.path.child(e), this.firestore, this.rE);
    }, n.prototype.add = function(t) {
        mr("CollectionReference.add", arguments, 1), Er("CollectionReference.add", "object", 1, this.rE ? this.rE.toFirestore(t) : t);
        var e = this.doc();
        return e.set(t).then((function() {
            return e;
        }));
    }, n.prototype.withConverter = function(t) {
        return new n(this.SE, this.firestore, t);
    }, n;
}(eo);

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// settings() defaults:
function io(t, e) {
    if (void 0 === e) return {
        merge: !1
    };
    if (Sr(t, e, [ "merge", "mergeFields" ]), Ir(t, "boolean", "merge", e.merge), function(t, e, n, r, i) {
        void 0 !== r && function(t, e, n, r, i) {
            if (!(r instanceof Array)) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires its " + e + " option to be an array, but it was: " + Dr(r));
            for (var o = 0; o < r.length; ++o) if (!i(r[o])) throw new I(T.INVALID_ARGUMENT, "Function " + t + "() requires all " + e + " elements to be " + n + ", but the value at index " + o + " was: " + Dr(r[o]));
        }(t, e, n, r, i);
    }(t, "mergeFields", "a string or a FieldPath", e.mergeFields, (function(t) {
        return "string" == typeof t || t instanceof qr;
    })), void 0 !== e.mergeFields && void 0 !== e.merge) throw new I(T.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
    return e;
}

function oo(t, e) {
    return void 0 === e ? {} : (Sr(t, e, [ "serverTimestamps" ]), Nr(t, 0, "serverTimestamps", e.serverTimestamps, [ "estimate", "previous", "none" ]), 
    e);
}

function so(t, e) {
    br(t, "object", 1, e), e && (Sr(t, e, [ "source" ]), Nr(t, 0, "source", e.source, [ "default", "server", "cache" ]));
}

function uo(t, e, n) {
    if (e instanceof $i) {
        if (e.firestore !== n) throw new I(T.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
        return e;
    }
    throw xr(t, "DocumentReference", 1, e);
}

function ao(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return xe();
    }
}

/**
 * Converts custom model object of type T into DocumentData by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to DocumentData
 * because we want to provide the user with a more specific error message if
 * their set() or fails due to invalid data originating from a toFirestore()
 * call.
 */ function ho(t, e, n) {
    var r;
    return t ? (r = t.toFirestore(e), n = "toFirestore() in " + n) : r = e, [ r, n ];
}

function co(t, e) {
    function n() {
        var t = "This constructor is private.";
        throw e && (t += " ", t += e), new I(T.INVALID_ARGUMENT, t);
    }
    // Make sure instanceof checks work and all methods are exposed on the public
    // constructor
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return n.prototype = t.prototype, 
    // Copy any static methods/members
    Object.assign(n, t), n;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Public instance that disallows construction at runtime. Note that this still
// allows instanceof checks.
var fo = co(Yi, "Use firebase.firestore() instead."), lo = co(Hi, "Use firebase.firestore().runTransaction() instead."), po = co(Xi, "Use firebase.firestore().batch() instead."), yo = co($i, "Use firebase.firestore().doc() instead."), vo = co(Ji), mo = co(to), go = co(eo), wo = co(no), Eo = co(ro, "Use firebase.firestore().collection() instead."), bo = co(/** @class */ function() {
    function t() {}
    return t.delete = function() {
        return vr("FieldValue.delete", arguments), new Fr;
    }, t.serverTimestamp = function() {
        return vr("FieldValue.serverTimestamp", arguments), new jr;
    }, t.arrayUnion = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we need access to the Firestore instance.
                return gr("FieldValue.arrayUnion", arguments, 1), new Br(t);
    }, t.arrayRemove = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we need access to the Firestore instance.
                return gr("FieldValue.arrayRemove", arguments, 1), new Gr(t);
    }, t.increment = function(t) {
        return Er("FieldValue.increment", "number", 1, t), mr("FieldValue.increment", arguments, 1), 
        new zr(t);
    }, t.prototype.isEqual = function(t) {
        return this === t;
    }, t;
}(), "Use FieldValue.<field>() instead."), To = co(Ur, "Use Blob.fromUint8Array() or Blob.fromBase64String() instead."), Io = {
    Firestore: fo,
    GeoPoint: Qr,
    Timestamp: S,
    Blob: To,
    Transaction: lo,
    WriteBatch: po,
    DocumentReference: yo,
    DocumentSnapshot: vo,
    Query: go,
    QueryDocumentSnapshot: mo,
    QuerySnapshot: wo,
    CollectionReference: Eo,
    FieldPath: qr,
    FieldValue: bo,
    setLogLevel: Yi.setLogLevel,
    CACHE_SIZE_UNLIMITED: Wi
}, No = /** @class */ function() {
    function t() {}
    return t.prototype.x_ = function(t) {
        // No-op.
    }, t.prototype.hu = function() {
        // No-op.
    }, t;
}(), Ao = /** @class */ function() {
    function t() {
        var t = this;
        this.DE = function() {
            return t.CE();
        }, this.FE = function() {
            return t.NE();
        }, this.kE = [], this.$E();
    }
    return t.prototype.x_ = function(t) {
        this.kE.push(t);
    }, t.prototype.hu = function() {
        window.removeEventListener("online", this.DE), window.removeEventListener("offline", this.FE);
    }, t.prototype.$E = function() {
        window.addEventListener("online", this.DE), window.addEventListener("offline", this.FE);
    }, t.prototype.CE = function() {
        De("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.kE; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.NE = function() {
        De("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.kE; t < e.length; t++) {
            (0, e[t])(1 /* UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t.Uh = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), _o = /** @class */ function() {
    function t(t) {
        this.ME = t.ME, this.LE = t.LE;
    }
    return t.prototype.t_ = function(t) {
        this.OE = t;
    }, t.prototype.Hc = function(t) {
        this.xE = t;
    }, t.prototype.onMessage = function(t) {
        this.BE = t;
    }, t.prototype.close = function() {
        this.LE();
    }, t.prototype.send = function(t) {
        this.ME(t);
    }, t.prototype.qE = function() {
        this.OE();
    }, t.prototype.UE = function(t) {
        this.xE(t);
    }, t.prototype.QE = function(t) {
        this.BE(t);
    }, t;
}(), Do = {
    BatchGetDocuments: "batchGet",
    Commit: "commit"
}, ko = "gl-js/ fire/" + E, So = /** @class */ function() {
    function t(t) {
        this.ii = t.ii;
        var e = t.ssl ? "https" : "http";
        this.WE = e + "://" + t.host, this.forceLongPolling = t.forceLongPolling;
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */    return t.prototype.jE = function(t, e) {
        if (e) for (var n in e.o) e.o.hasOwnProperty(n) && (t[n] = e.o[n]);
        t["X-Goog-Api-Client"] = ko;
    }, t.prototype.l_ = function(t, e, n) {
        var r = this, i = this.KE(t);
        return new Promise((function(o, s) {
            var u = new y;
            u.listenOnce(v.COMPLETE, (function() {
                try {
                    switch (u.getLastErrorCode()) {
                      case m.NO_ERROR:
                        var e = u.getResponseJson();
                        De("Connection", "XHR received:", JSON.stringify(e)), o(e);
                        break;

                      case m.TIMEOUT:
                        De("Connection", 'RPC "' + t + '" timed out'), s(new I(T.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case m.HTTP_ERROR:
                        var n = u.getStatus();
                        if (De("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", u.getResponseText()), 
                        n > 0) {
                            var r = u.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var i = function(t) {
                                    var e = t.toLowerCase().replace("_", "-");
                                    return Object.values(T).indexOf(e) >= 0 ? e : T.UNKNOWN;
                                }(r.status);
                                s(new I(i, r.message));
                            } else s(new I(T.UNKNOWN, "Server responded with status " + u.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        De("Connection", 'RPC "' + t + '" failed'), s(new I(T.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        xe();
                    }
                } finally {
                    De("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            // The database field is already encoded in URL. Specifying it again in
            // the body is not necessary in production, and will cause duplicate field
            // errors in the Firestore Emulator. Let's remove it.
            var a = Object.assign({}, e);
            delete a.database;
            var h = JSON.stringify(a);
            De("Connection", "XHR sending: ", i + " " + h);
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the
            // $httpOverwrite parameter supported by ESF to avoid
            // triggering preflight requests.
            var c = {
                "Content-Type": "text/plain"
            };
            r.jE(c, n), u.send(i, "POST", h, c, 15);
        }));
    }, t.prototype.d_ = function(t, e, n) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.l_(t, e, n);
    }, t.prototype.e_ = function(t, e) {
        var n = [ this.WE, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], r = g(), i = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: "projects/" + this.ii.projectId + "/databases/" + this.ii.database
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling
        };
        this.jE(i.initMessageHeaders, e), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        a() || h() || c() || f() || l() || p() || (i.httpHeadersOverwriteParam = "$httpHeaders");
        var o = n.join("");
        De("Connection", "Creating WebChannel: " + o + " " + i);
        var s = r.createWebChannel(o, i), u = !1, d = !1, y = new _o({
            ME: function(t) {
                d ? De("Connection", "Not sending because WebChannel is closed:", t) : (u || (De("Connection", "Opening WebChannel transport."), 
                s.open(), u = !0), De("Connection", "WebChannel sending:", t), s.send(t));
            },
            LE: function() {
                return s.close();
            }
        }), v = function(t, e) {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            s.listen(t, (function(t) {
                try {
                    e(t);
                } catch (t) {
                    setTimeout((function() {
                        throw t;
                    }), 0);
                }
            }));
        };
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
        return v(w.EventType.OPEN, (function() {
            d || De("Connection", "WebChannel transport opened.");
        })), v(w.EventType.CLOSE, (function() {
            d || (d = !0, De("Connection", "WebChannel transport closed"), y.UE());
        })), v(w.EventType.ERROR, (function(t) {
            d || (d = !0, De("Connection", "WebChannel transport errored:", t), y.UE(new I(T.UNAVAILABLE, "The operation could not be completed")));
        })), v(w.EventType.MESSAGE, (function(t) {
            var e;
            if (!d) {
                var n = t.data[0];
                Ve(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    De("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    var o = i.status, u = function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var e = At[t];
                        if (void 0 !== e) return zt(e);
                    }(o), a = i.message;
                    void 0 === u && (u = T.INTERNAL, a = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    d = !0, y.UE(new I(u, a)), s.close();
                } else De("Connection", "WebChannel received:", n), y.QE(n);
            }
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            y.qE();
        }), 0), y;
    }, 
    // visible for testing
    t.prototype.KE = function(t) {
        var e = Do[t];
        return this.WE + "/v1/projects/" + this.ii.projectId + "/databases/" + this.ii.database + "/documents:" + e;
    }, t;
}();

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Implements the Platform API for browsers and some browser-like environments
// (including ReactNative).
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Registers the main Firestore build with the components framework.
 * Persistence can be enabled via `firebase.firestore().enablePersistence()`.
 */
function xo(t) {
    /**
 * Configures Firestore as part of the Firebase SDK by calling registerService.
 *
 * @param firebase The FirebaseNamespace to register Firestore with
 * @param firestoreFactory A factory function that returns a new Firestore
 *    instance.
 */
    !function(t, e) {
        t.INTERNAL.registerComponent(new d("firestore", (function(t) {
            return function(t, e) {
                return new Yi(t, e, new ji);
            }(t.getProvider("app").getImmediate(), t.getProvider("auth-internal"));
        }), "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, Io)));
    }(t), t.registerVersion("@firebase/firestore", "1.14.4")
    /**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    /**
 * This code needs to run before Firestore is used. This can be achieved in
 * several ways:
 *   1) Through the JSCompiler compiling this code and then (automatically)
 *      executing it before exporting the Firestore symbols.
 *   2) Through importing this module first in a Firestore main module
 */;
}

Ie.an(new (/** @class */ function() {
    function t() {
        this.oc = "undefined" != typeof atob;
    }
    return Object.defineProperty(t.prototype, "document", {
        get: function() {
            // `document` is not always available, e.g. in ReactNative and WebWorkers.
            // eslint-disable-next-line no-restricted-globals
            return "undefined" != typeof document ? document : null;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "window", {
        get: function() {
            // `window` is not always available, e.g. in ReactNative and WebWorkers.
            // eslint-disable-next-line no-restricted-globals
            return "undefined" != typeof window ? window : null;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.gT = function(t) {
        return Promise.resolve(new So(t));
    }, t.prototype.wT = function() {
        return Ao.Uh() ? new Ao : new No;
    }, t.prototype.yc = function(t) {
        return new be(t, {
            hi: !0
        });
    }, t.prototype.un = function(t) {
        return JSON.stringify(t);
    }, t.prototype.atob = function(t) {
        return atob(t);
    }, t.prototype.btoa = function(t) {
        return btoa(t);
    }, t.prototype._n = function(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        var e = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
        if (e) e.getRandomValues(n); else 
        // Falls back to Math.random
        for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
        return n;
    }, t;
}())), xo(i);

export { xo as __PRIVATE_registerFirestore };
//# sourceMappingURL=index.esm.js.map
