"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t, e = require("tslib"), n = (t = require("@firebase/app")) && "object" == typeof t && "default" in t ? t.default : t, r = require("@firebase/logger"), i = require("@firebase/util"), o = require("@firebase/component"), s = require("@firebase/webchannel-wrapper"), u = n.SDK_VERSION, a = /** @class */ function() {
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

/** A user with a null UID. */ a.UNAUTHENTICATED = new a(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
a.i = new a("google-credentials-uid"), a.h = new a("first-party-uid");

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
var h = {
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
}, c = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this, n) || this).code = e, r.message = n, r.name = "FirebaseError", 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        r.toString = function() {
            return r.name + ": [code=" + r.code + "]: " + r.message;
        }, r;
    }
    return e.__extends(n, t), n;
}(Error), f = function(t, e) {
    this.user = e, this.type = "OAuth", this.o = {}, 
    // Set the headers using Object Literal notation to avoid minification
    this.o.Authorization = "Bearer " + t;
}, l = /** @class */ function() {
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
    }, t.prototype.l = function() {}, t.prototype._ = function(t) {
        this.u = t, 
        // Fire with initial user.
        t(a.UNAUTHENTICATED);
    }, t.prototype.T = function() {
        this.u = null;
    }, t;
}(), p = /** @class */ function() {
    function t(t) {
        var e = this;
        /**
         * The auth token listener registered with FirebaseApp, retained here so we
         * can unregister it.
         */        this.m = null, 
        /** Tracks the current User. */
        this.currentUser = a.UNAUTHENTICATED, this.I = !1, 
        /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
        this.R = 0, 
        /** The listener registered with setChangeListener(). */
        this.u = null, this.forceRefresh = !1, this.m = function() {
            e.R++, e.currentUser = e.A(), e.I = !0, e.u && e.u(e.currentUser);
        }, this.R = 0, this.auth = t.getImmediate({
            optional: !0
        }), this.auth ? this.auth.addAuthTokenListener(this.m) : (
        // if auth is not available, invoke tokenListener once with null token
        this.m(null), t.get().then((function(t) {
            e.auth = t, e.m && 
            // tokenListener can be removed by removeChangeListener()
            e.auth.addAuthTokenListener(e.m);
        }), (function() {})));
    }
    return t.prototype.getToken = function() {
        var t = this, e = this.R, n = this.forceRefresh;
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
                return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((function(n) {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            if (t.R !== e) throw new c(h.ABORTED, "getToken aborted due to token change.");
            return n ? (me("string" == typeof n.accessToken), new f(n.accessToken, t.currentUser)) : null;
        })) : Promise.resolve(null);
    }, t.prototype.l = function() {
        this.forceRefresh = !0;
    }, t.prototype._ = function(t) {
        this.u = t, 
        // Fire the initial event
        this.I && t(this.currentUser);
    }, t.prototype.T = function() {
        this.auth && this.auth.removeAuthTokenListener(this.m), this.m = null, this.u = null;
    }, 
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    t.prototype.A = function() {
        var t = this.auth && this.auth.getUid();
        return me(null === t || "string" == typeof t), new a(t);
    }, t;
}(), d = /** @class */ function() {
    function t(t, e) {
        this.P = t, this.V = e, this.type = "FirstParty", this.user = a.h;
    }
    return Object.defineProperty(t.prototype, "o", {
        get: function() {
            var t = {
                "X-Goog-AuthUser": this.V
            }, e = this.P.auth.p([]);
            return e && (t.Authorization = e), t;
        },
        enumerable: !0,
        configurable: !0
    }), t;
}(), y = /** @class */ function() {
    function t(t, e) {
        this.P = t, this.V = e;
    }
    return t.prototype.getToken = function() {
        return Promise.resolve(new d(this.P, this.V));
    }, t.prototype._ = function(t) {
        // Fire with initial uid.
        t(a.h);
    }, t.prototype.T = function() {}, t.prototype.l = function() {}, t;
}(), v = /** @class */ function() {
    function t(t, e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new c(h.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new c(h.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new c(h.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new c(h.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
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
    }, t.prototype.g = function(t) {
        return this.seconds === t.seconds ? _e(this.nanoseconds, t.nanoseconds) : _e(this.seconds, t.seconds);
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
}(), m = /** @class */ function() {
    function t(t) {
        this.timestamp = t;
    }
    return t.v = function(e) {
        return new t(e);
    }, t.min = function() {
        return new t(new v(0, 0));
    }, t.prototype.S = function(t) {
        return this.timestamp.g(t.timestamp);
    }, t.prototype.isEqual = function(t) {
        return this.timestamp.isEqual(t.timestamp);
    }, 
    /** Returns a number representation of the version for use in spec tests. */ t.prototype.C = function() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }, t.prototype.toString = function() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }, t.prototype.D = function() {
        return this.timestamp;
    }, t;
}(), g = /** @class */ function() {
    function t(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && ve(), void 0 === n ? n = t.length - e : n > t.length - e && ve(), 
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
        })) : n.push(e), this.$(n);
    }, 
    /** The index of one past the last segment of the path. */ t.prototype.limit = function() {
        return this.offset + this.length;
    }, t.prototype.L = function(t) {
        return t = void 0 === t ? 1 : t, this.$(this.segments, this.offset + t, this.length - t);
    }, t.prototype.k = function() {
        return this.$(this.segments, this.offset, this.length - 1);
    }, t.prototype.O = function() {
        return this.segments[this.offset];
    }, t.prototype.q = function() {
        return this.get(this.length - 1);
    }, t.prototype.get = function(t) {
        return this.segments[this.offset + t];
    }, t.prototype.M = function() {
        return 0 === this.length;
    }, t.prototype.B = function(t) {
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
}(), w = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.$ = function(t, e, r) {
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
    n.G = function(t) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        if (t.indexOf("//") >= 0) throw new c(h.INVALID_ARGUMENT, "Invalid path (" + t + "). Paths must not contain // in them.");
        // We may still have an empty segment at the beginning or end if they had a
        // leading or trailing slash (which we allow).
                return new n(t.split("/").filter((function(t) {
            return t.length > 0;
        })));
    }, n;
}(g);

/**
 * An error class used for Firestore-generated errors. Ideally we should be
 * using FirebaseError, but integrating with it is overly arduous at the moment,
 * so we define our own compatible error class (with a `name` of 'FirebaseError'
 * and compatible `code` and `message` fields.)
 */ w.H = new w([]);

var _ = /^[_a-zA-Z][_a-zA-Z0-9]*$/, b = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.$ = function(t, e, r) {
        return new n(t, e, r);
    }, 
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */
    n.K = function(t) {
        return _.test(t);
    }, n.prototype.j = function() {
        return this.W().map((function(t) {
            return t = t.replace("\\", "\\\\").replace("`", "\\`"), n.K(t) || (t = "`" + t + "`"), 
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
    n.X = function() {
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
    n.J = function(t) {
        for (var e = [], r = "", i = 0, o = function() {
            if (0 === r.length) throw new c(h.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            e.push(r), r = "";
        }, s = !1; i < t.length; ) {
            var u = t[i];
            if ("\\" === u) {
                if (i + 1 === t.length) throw new c(h.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                var a = t[i + 1];
                if ("\\" !== a && "." !== a && "`" !== a) throw new c(h.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                r += a, i += 2;
            } else "`" === u ? (s = !s, i++) : "." !== u || s ? (r += u, i++) : (o(), i++);
        }
        if (o(), s) throw new c(h.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new n(e);
    }, n;
}(g);

/** A dot-separated path for navigating sub-objects within a document. */ b.H = new b([]);

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
var E = /** @class */ function() {
    function t(t) {
        this.path = t;
    }
    return t.Z = function(e) {
        return new t(w.G(e).L(5));
    }, 
    /** Returns true if the document is in the specified collectionId. */ t.prototype.tt = function(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }, t.prototype.isEqual = function(t) {
        return null !== t && 0 === w.N(this.path, t.path);
    }, t.prototype.toString = function() {
        return this.path.toString();
    }, t.N = function(t, e) {
        return w.N(t.path, e.path);
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
        return new t(new w(e.slice()));
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
 */ function T(t) {
    var e = 0;
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function A(t, e) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function I(t) {
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
 */ E.EMPTY = new E(new w([]));

var N = /** @class */ function() {
    function t(t) {
        this.it = t;
    }
    return t.fromBase64String = function(e) {
        return new t(he.nt().atob(e));
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
        return he.nt().btoa(this.it);
    }, t.prototype.toUint8Array = function() {
        return function(t) {
            for (var e = new Uint8Array(t.length), n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }(this.it);
    }, t.prototype.rt = function() {
        return 2 * this.it.length;
    }, t.prototype.S = function(t) {
        return _e(this.it, t.it);
    }, t.prototype.isEqual = function(t) {
        return this.it === t.it;
    }, t;
}();

function D(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function R(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return -0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value The value to test for being an integer and in the safe range
 */ function V(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the local time at which this timestamp was first set.
 */ function k(t) {
    var e = C(t.mapValue.fields.__local_write_time__.timestampValue);
    return new v(e.seconds, e.nanos);
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
N.ht = new N("");

var S = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/** Extracts the backend's type order for the provided value. */ function L(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? V(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : ve();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function M(t, e) {
    var n = L(t);
    if (n !== L(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return k(t).isEqual(k(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            var n = C(t.timestampValue), r = C(e.timestampValue);
            return n.seconds === r.seconds && n.nanos === r.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return F(t.bytesValue).isEqual(F(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return x(t.geoPointValue.latitude) === x(e.geoPointValue.latitude) && x(t.geoPointValue.longitude) === x(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return x(t.integerValue) === x(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                var n = x(t.doubleValue), r = x(e.doubleValue);
                return n === r ? R(n) === R(r) : isNaN(n) && isNaN(r);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return be(t.arrayValue.values || [], e.arrayValue.values || [], M);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            var n = t.mapValue.fields || {}, r = e.mapValue.fields || {};
            if (T(n) !== T(r)) return !1;
            for (var i in n) if (n.hasOwnProperty(i) && (void 0 === r[i] || !M(n[i], r[i]))) return !1;
            return !0;
        }(t, e);

      default:
        return ve();
    }
}

function q(t, e) {
    return void 0 !== (t.values || []).find((function(t) {
        return M(t, e);
    }));
}

function U(t, e) {
    var n = L(t), r = L(e);
    if (n !== r) return _e(n, r);
    switch (n) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return _e(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            var n = x(t.integerValue || t.doubleValue), r = x(e.integerValue || e.doubleValue);
            return n < r ? -1 : n > r ? 1 : n === r ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(r) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return O(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return O(k(t), k(e));

      case 5 /* StringValue */ :
        return _e(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            var n = F(t), r = F(e);
            return n.S(r);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            for (var n = t.split("/"), r = e.split("/"), i = 0; i < n.length && i < r.length; i++) {
                var o = _e(n[i], r[i]);
                if (0 !== o) return o;
            }
            return _e(n.length, r.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            var n = _e(x(t.latitude), x(e.latitude));
            return 0 !== n ? n : _e(x(t.longitude), x(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            for (var n = t.values || [], r = e.values || [], i = 0; i < n.length && i < r.length; ++i) {
                var o = U(n[i], r[i]);
                if (o) return o;
            }
            return _e(n.length, r.length);
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
                var u = _e(r[s], o[s]);
                if (0 !== u) return u;
                var a = U(n[r[s]], i[o[s]]);
                if (0 !== a) return a;
            }
            return _e(r.length, o.length);
        }(t.mapValue, e.mapValue);

      default:
        throw ve();
    }
}

function O(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return _e(t, e);
    var n = C(t), r = C(e), i = _e(n.seconds, r.seconds);
    return 0 !== i ? i : _e(n.nanos, r.nanos);
}

function P(t) {
    return function t(e) {
        return "nullValue" in e ? "null" : "booleanValue" in e ? "" + e.booleanValue : "integerValue" in e ? "" + e.integerValue : "doubleValue" in e ? "" + e.doubleValue : "timestampValue" in e ? function(t) {
            var e = C(t);
            return "time(" + e.seconds + "," + e.nanos + ")";
        }(e.timestampValue) : "stringValue" in e ? e.stringValue : "bytesValue" in e ? F(e.bytesValue).toBase64() : "referenceValue" in e ? (r = e.referenceValue, 
        E.Z(r).toString()) : "geoPointValue" in e ? "geo(" + (n = e.geoPointValue).latitude + "," + n.longitude + ")" : "arrayValue" in e ? function(e) {
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
        }(e.mapValue) : ve();
        var n, r;
    }(t);
}

function C(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (me(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        var e = 0, n = S.exec(t);
        if (me(!!n), n[1]) {
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
        seconds: x(t.seconds),
        nanos: x(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function x(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function F(t) {
    return "string" == typeof t ? N.fromBase64String(t) : N.fromUint8Array(t);
}

/** Returns a reference value for the provided database and key. */ function j(t, e) {
    return {
        referenceValue: "projects/" + t.projectId + "/databases/" + t.database + "/documents/" + e.path.j()
    };
}

/** Returns true if `value` is an IntegerValue . */ function G(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */ function B(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function z(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function Q(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function W(t) {
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
/** Transforms a value into a server-generated timestamp. */ var J = /** @class */ function() {
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

J.instance = new J;

/** Transforms an array value via a union operation. */
var H = /** @class */ function() {
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
        for (var e = Z(t), n = function(t) {
            e.some((function(e) {
                return M(e, t);
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
        return e instanceof t && be(this.elements, e.elements, M);
    }, t;
}(), X = /** @class */ function() {
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
        for (var e = Z(t), n = function(t) {
            e = e.filter((function(e) {
                return !M(e, t);
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
        return e instanceof t && be(this.elements, e.elements, M);
    }, t;
}(), Y = /** @class */ function() {
    function t(t, e) {
        this.serializer = t, this.ct = e;
    }
    return t.prototype.ot = function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        var n = this.ut(t), r = this.asNumber(n) + this.asNumber(this.ct);
        return G(n) && G(this.ct) ? this.serializer.lt(r) : this.serializer._t(r);
    }, t.prototype.at = function(t, e) {
        return e;
    }, 
    /**
     * Inspects the provided value, returning the provided value if it is already
     * a NumberValue, otherwise returning a coerced value of 0.
     */
    t.prototype.ut = function(t) {
        return G(e = t) || function(t) {
            return !!t && "doubleValue" in t;
        }(e) ? t : {
            integerValue: 0
        };
        var e;
    }, t.prototype.isEqual = function(e) {
        return e instanceof t && M(this.ct, e.ct);
    }, t.prototype.asNumber = function(t) {
        return x(t.integerValue || t.doubleValue);
    }, t;
}();

/** Transforms an array value via a remove operation. */ function Z(t) {
    return B(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
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
 */ var K = /** @class */ function() {
    function t(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(b.N)
        /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */;
    }
    return t.prototype.ft = function(t) {
        for (var e = 0, n = this.fields; e < n.length; e++) {
            if (n[e].B(t)) return !0;
        }
        return !1;
    }, t.prototype.isEqual = function(t) {
        return be(this.fields, t.fields, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), $ = /** @class */ function() {
    function t(t, e) {
        this.field = t, this.transform = e;
    }
    return t.prototype.isEqual = function(t) {
        return this.field.isEqual(t.field) && this.transform.isEqual(t.transform);
    }, t;
}(), tt = function(
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
}, et = /** @class */ function() {
    function t(t, e) {
        this.updateTime = t, this.exists = e
        /** Creates a new empty Precondition. */;
    }
    return t.dt = function() {
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
    t.prototype.wt = function(t) {
        return void 0 !== this.updateTime ? t instanceof dt && t.version.isEqual(this.updateTime) : void 0 === this.exists || this.exists === t instanceof dt;
    }, t.prototype.isEqual = function(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }, t;
}(), nt = /** @class */ function() {
    function t() {}
    return t.prototype.Et = function(t) {}, 
    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */
    t.It = function(t) {
        return t instanceof dt ? t.version : m.min();
    }, t;
}(), rt = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this) || this).key = e, i.value = n, i.Rt = r, i.type = 0 /* Set */ , 
        i;
    }
    return e.__extends(n, t), n.prototype.at = function(t, e) {
        this.Et(t);
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        var n = e.version;
        return new dt(this.key, n, this.value, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        if (this.Et(t), !this.Rt.wt(t)) return t;
        var r = nt.It(t);
        return new dt(this.key, r, this.value, {
            At: !0
        });
    }, n.prototype.Pt = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.value.isEqual(t.value) && this.Rt.isEqual(t.Rt);
    }, n;
}(nt), it = /** @class */ function(t) {
    function n(e, n, r, i) {
        var o = this;
        return (o = t.call(this) || this).key = e, o.data = n, o.Vt = r, o.Rt = i, o.type = 1 /* Patch */ , 
        o;
    }
    return e.__extends(n, t), n.prototype.at = function(t, e) {
        if (this.Et(t), !this.Rt.wt(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new vt(this.key, e.version);
        var n = this.pt(t);
        return new dt(this.key, e.version, n, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        if (this.Et(t), !this.Rt.wt(t)) return t;
        var r = nt.It(t), i = this.pt(t);
        return new dt(this.key, r, i, {
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
    n.prototype.pt = function(t) {
        var e;
        return e = t instanceof dt ? t.data() : at.empty(), this.yt(e);
    }, n.prototype.yt = function(t) {
        var e = this, n = new ht(t);
        return this.Vt.fields.forEach((function(t) {
            if (!t.M()) {
                var r = e.data.field(t);
                null !== r ? n.set(t, r) : n.delete(t);
            }
        })), n.gt();
    }, n;
}(nt), ot = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).key = e, r.fieldTransforms = n, r.type = 2 /* Transform */ , 
        // NOTE: We set a precondition of exists: true as a safety-check, since we
        // always combine TransformMutations with a SetMutation or PatchMutation which
        // (if successful) should end up with an existing document.
        r.Rt = et.exists(!0), r;
    }
    return e.__extends(n, t), n.prototype.at = function(t, e) {
        if (this.Et(t), me(null != e.transformResults), !this.Rt.wt(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new vt(this.key, e.version);
        var n = this.bt(t), r = this.vt(t, e.transformResults), i = e.version, o = this.St(n.data(), r);
        return new dt(this.key, i, o, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        if (this.Et(t), !this.Rt.wt(t)) return t;
        var r = this.bt(t), i = this.Ct(n, t, e), o = this.St(r.data(), i);
        return new dt(this.key, r.version, o, {
            At: !0
        });
    }, n.prototype.Pt = function(t) {
        for (var e = null, n = 0, r = this.fieldTransforms; n < r.length; n++) {
            var i = r[n], o = t instanceof dt ? t.field(i.field) : void 0, s = i.transform.ut(o || null);
            null != s && (e = null == e ? (new ht).set(i.field, s) : e.set(i.field, s));
        }
        return e ? e.gt() : null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && be(this.fieldTransforms, t.fieldTransforms, (function(t, e) {
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
        me(this.fieldTransforms.length === e.length);
        for (var r = 0; r < e.length; r++) {
            var i = this.fieldTransforms[r], o = i.transform, s = null;
            t instanceof dt && (s = t.field(i.field)), n.push(o.at(s, e[r]));
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
    n.prototype.Ct = function(t, e, n) {
        for (var r = [], i = 0, o = this.fieldTransforms; i < o.length; i++) {
            var s = o[i], u = s.transform, a = null;
            e instanceof dt && (a = e.field(s.field)), null === a && n instanceof dt && (
            // If the current document does not contain a value for the mutated
            // field, use the value that existed before applying this mutation
            // batch. This solves an edge case where a PatchMutation clears the
            // values in a nested map before the TransformMutation is applied.
            a = n.field(s.field)), r.push(u.ot(a, t));
        }
        return r;
    }, n.prototype.St = function(t, e) {
        for (var n = new ht(t), r = 0; r < this.fieldTransforms.length; r++) {
            var i = this.fieldTransforms[r].field;
            n.set(i, e[r]);
        }
        return n.gt();
    }, n;
}(nt), st = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).key = e, r.Rt = n, r.type = 3 /* Delete */ , r;
    }
    return e.__extends(n, t), n.prototype.at = function(t, e) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        return this.Et(t), new yt(this.key, e.version, {
            hasCommittedMutations: !0
        });
    }, n.prototype.ot = function(t, e, n) {
        return this.Et(t), this.Rt.wt(t) ? new yt(this.key, m.min()) : t;
    }, n.prototype.Pt = function(t) {
        return null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Rt.isEqual(t.Rt);
    }, n;
}(nt), ut = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this) || this).key = e, r.Rt = n, r.type = 4 /* Verify */ , r;
    }
    return e.__extends(n, t), n.prototype.at = function(t, e) {
        ve();
    }, n.prototype.ot = function(t, e, n) {
        ve();
    }, n.prototype.Pt = function(t) {
        ve();
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.Rt.isEqual(t.Rt);
    }, n;
}(nt), at = /** @class */ function() {
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
        if (t.M()) return this.proto;
        for (var e = this.proto, n = 0; n < t.length - 1; ++n) {
            if (!e.mapValue.fields) return null;
            if (!W(e = e.mapValue.fields[t.get(n)])) return null;
        }
        return (e = (e.mapValue.fields || {})[t.q()]) || null;
    }, t.prototype.isEqual = function(t) {
        return M(this.proto, t.proto);
    }, t;
}(), ht = /** @class */ function() {
    /**
     * @param baseObject The object to mutate.
     */
    function t(t) {
        void 0 === t && (t = at.empty()), this.Dt = t, 
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
            n = o : o && 10 /* ObjectValue */ === L(o) ? (
            // Convert the existing Protobuf MapValue into a map
            o = new Map(Object.entries(o.mapValue.fields || {})), n.set(i, o), n = o) : (
            // Create an empty map to represent the current nesting level
            o = new Map, n.set(i, o), n = o);
        }
        n.set(t.q(), e);
    }, 
    /** Returns an ObjectValue with all mutations applied. */ t.prototype.gt = function() {
        var t = this.$t(b.H, this.Ft);
        return null != t ? new at(t) : this.Dt;
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
    t.prototype.$t = function(t, e) {
        var n = this, r = !1, i = this.Dt.field(t), o = W(i) ? // If there is already data at the current path, base our
        Object.assign({}, i.mapValue.fields) : {};
        return e.forEach((function(e, i) {
            if (e instanceof Map) {
                var s = n.$t(t.child(i), e);
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
function ct(t) {
    var e = [];
    return A(t.fields || {}, (function(t, n) {
        var r = new b([ t ]);
        if (W(n)) {
            var i = ct(n.mapValue).fields;
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
    })), new K(e)
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

var ft, lt, pt = function(t, e) {
    this.key = t, this.version = e;
}, dt = /** @class */ function(t) {
    function n(e, n, r, i) {
        var o = this;
        return (o = t.call(this, e, n) || this).Lt = r, o.At = !!i.At, o.hasCommittedMutations = !!i.hasCommittedMutations, 
        o;
    }
    return e.__extends(n, t), n.prototype.field = function(t) {
        return this.Lt.field(t);
    }, n.prototype.data = function() {
        return this.Lt;
    }, n.prototype.kt = function() {
        return this.Lt.proto;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.At === t.At && this.hasCommittedMutations === t.hasCommittedMutations && this.Lt.isEqual(t.Lt);
    }, n.prototype.toString = function() {
        return "Document(" + this.key + ", " + this.version + ", " + this.Lt.toString() + ", {hasLocalMutations: " + this.At + "}), {hasCommittedMutations: " + this.hasCommittedMutations + "})";
    }, Object.defineProperty(n.prototype, "hasPendingWrites", {
        get: function() {
            return this.At || this.hasCommittedMutations;
        },
        enumerable: !0,
        configurable: !0
    }), n;
}(pt), yt = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, e, n) || this).hasCommittedMutations = !(!r || !r.hasCommittedMutations), 
        i;
    }
    return e.__extends(n, t), n.prototype.toString = function() {
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
}(pt), vt = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.toString = function() {
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
}(pt), mt = /** @class */ function() {
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
        this.startAt = o, this.endAt = s, this.Ot = null;
    }
    return t.prototype.canonicalId = function() {
        if (null === this.Ot) {
            var t = this.path.j();
            null !== this.collectionGroup && (t += "|cg:" + this.collectionGroup), t += "|f:", 
            t += this.filters.map((function(t) {
                return t.canonicalId();
            })).join(","), t += "|ob:", t += this.orderBy.map((function(t) {
                return t.canonicalId();
            })).join(","), D(this.limit) || (t += "|l:", t += this.limit), this.startAt && (t += "|lb:", 
            t += this.startAt.canonicalId()), this.endAt && (t += "|ub:", t += this.endAt.canonicalId()), 
            this.Ot = t;
        }
        return this.Ot;
    }, t.prototype.toString = function() {
        var t = this.path.j();
        return null !== this.collectionGroup && (t += " collectionGroup=" + this.collectionGroup), 
        this.filters.length > 0 && (t += ", filters: [" + this.filters.join(", ") + "]"), 
        D(this.limit) || (t += ", limit: " + this.limit), this.orderBy.length > 0 && (t += ", orderBy: [" + this.orderBy.join(", ") + "]"), 
        this.startAt && (t += ", startAt: " + this.startAt.canonicalId()), this.endAt && (t += ", endAt: " + this.endAt.canonicalId()), 
        "Target(" + t + ")";
    }, t.prototype.isEqual = function(t) {
        if (this.limit !== t.limit) return !1;
        if (this.orderBy.length !== t.orderBy.length) return !1;
        for (var e = 0; e < this.orderBy.length; e++) if (!this.orderBy[e].isEqual(t.orderBy[e])) return !1;
        if (this.filters.length !== t.filters.length) return !1;
        for (var n = 0; n < this.filters.length; n++) if (!this.filters[n].isEqual(t.filters[n])) return !1;
        return this.collectionGroup === t.collectionGroup && !!this.path.isEqual(t.path) && !!(null !== this.startAt ? this.startAt.isEqual(t.startAt) : null === t.startAt) && (null !== this.endAt ? this.endAt.isEqual(t.endAt) : null === t.endAt);
    }, t.prototype.qt = function() {
        return E.et(this.path) && null === this.collectionGroup && 0 === this.filters.length;
    }, t;
}(), gt = /** @class */ function() {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    function t(t, e, n, r, i, o /* First */ , s, u) {
        void 0 === e && (e = null), void 0 === n && (n = []), void 0 === r && (r = []), 
        void 0 === i && (i = null), void 0 === o && (o = "F"), void 0 === s && (s = null), 
        void 0 === u && (u = null), this.path = t, this.collectionGroup = e, this.Mt = n, 
        this.filters = r, this.limit = i, this.xt = o, this.startAt = s, this.endAt = u, 
        this.Bt = null, 
        // The corresponding `Target` of this `Query` instance.
        this.Ut = null, this.startAt && this.Qt(this.startAt), this.endAt && this.Qt(this.endAt);
    }
    return t.Wt = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "orderBy", {
        get: function() {
            if (null === this.Bt) {
                this.Bt = [];
                var t = this.jt(), e = this.Gt();
                if (null !== t && null === e) 
                // In order to implicitly add key ordering, we must also add the
                // inequality filter field for it to be a valid query.
                // Note that the default inequality field and key ordering is ascending.
                t.Y() || this.Bt.push(new Nt(t)), this.Bt.push(new Nt(b.X(), "asc" /* ASCENDING */)); else {
                    for (var n = !1, r = 0, i = this.Mt; r < i.length; r++) {
                        var o = i[r];
                        this.Bt.push(o), o.field.Y() && (n = !0);
                    }
                    if (!n) {
                        // The order of the implicit key ordering always matches the last
                        // explicit order by
                        var s = this.Mt.length > 0 ? this.Mt[this.Mt.length - 1].dir : "asc" /* ASCENDING */;
                        this.Bt.push(new Nt(b.X(), s));
                    }
                }
            }
            return this.Bt;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Ht = function(e) {
        var n = this.filters.concat([ e ]);
        return new t(this.path, this.collectionGroup, this.Mt.slice(), n, this.limit, this.xt, this.startAt, this.endAt);
    }, t.prototype.Kt = function(e) {
        // TODO(dimond): validate that orderBy does not list the same key twice.
        var n = this.Mt.concat([ e ]);
        return new t(this.path, this.collectionGroup, n, this.filters.slice(), this.limit, this.xt, this.startAt, this.endAt);
    }, t.prototype.zt = function(e) {
        return new t(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), e, "F" /* First */ , this.startAt, this.endAt);
    }, t.prototype.Yt = function(e) {
        return new t(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), e, "L" /* Last */ , this.startAt, this.endAt);
    }, t.prototype.Xt = function(e) {
        return new t(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), this.limit, this.xt, e, this.endAt);
    }, t.prototype.Jt = function(e) {
        return new t(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), this.limit, this.xt, this.startAt, e);
    }, 
    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */
    t.prototype.Zt = function(e) {
        return new t(e, 
        /*collectionGroup=*/ null, this.Mt.slice(), this.filters.slice(), this.limit, this.xt, this.startAt, this.endAt);
    }, 
    /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */
    t.prototype.te = function() {
        return 0 === this.filters.length && null === this.limit && null == this.startAt && null == this.endAt && (0 === this.Mt.length || 1 === this.Mt.length && this.Mt[0].field.Y());
    }, 
    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    t.prototype.canonicalId = function() {
        return this.ee().canonicalId() + "|lt:" + this.xt;
    }, t.prototype.toString = function() {
        return "Query(target=" + this.ee().toString() + "; limitType=" + this.xt + ")";
    }, t.prototype.isEqual = function(t) {
        return this.ee().isEqual(t.ee()) && this.xt === t.xt;
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
        return !D(this.limit) && "F" /* First */ === this.xt;
    }, t.prototype.ae = function() {
        return !D(this.limit) && "L" /* Last */ === this.xt;
    }, t.prototype.Gt = function() {
        return this.Mt.length > 0 ? this.Mt[0].field : null;
    }, t.prototype.jt = function() {
        for (var t = 0, e = this.filters; t < e.length; t++) {
            var n = e[t];
            if (n instanceof wt && n.ue()) return n.field;
        }
        return null;
    }, 
    // Checks if any of the provided Operators are included in the query and
    // returns the first one that is, or null if none are.
    t.prototype.ce = function(t) {
        for (var e = 0, n = this.filters; e < n.length; e++) {
            var r = n[e];
            if (r instanceof wt && t.indexOf(r.op) >= 0) return r.op;
        }
        return null;
    }, t.prototype.qt = function() {
        return this.ee().qt();
    }, t.prototype.le = function() {
        return null !== this.collectionGroup;
    }, 
    /**
     * Converts this `Query` instance to it's corresponding `Target`
     * representation.
     */
    t.prototype.ee = function() {
        if (!this.Ut) if ("F" /* First */ === this.xt) this.Ut = new mt(this.path, this.collectionGroup, this.orderBy, this.filters, this.limit, this.startAt, this.endAt); else {
            for (
            // Flip the orderBy directions since we want the last results
            var t = [], e = 0, n = this.orderBy; e < n.length; e++) {
                var r = n[e], i = "desc" /* DESCENDING */ === r.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Nt(r.field, i));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                        var o = this.endAt ? new It(this.endAt.position, !this.endAt.before) : null, s = this.startAt ? new It(this.startAt.position, !this.startAt.before) : null;
            // Now return as a LimitType.First query.
                        this.Ut = new mt(this.path, this.collectionGroup, t, this.filters, this.limit, o, s);
        }
        return this.Ut;
    }, t.prototype.ie = function(t) {
        var e = t.key.path;
        return null !== this.collectionGroup ? t.key.tt(this.collectionGroup) && this.path.B(e) : E.et(this.path) ? this.path.isEqual(e) : this.path.U(e);
    }, 
    /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */
    t.prototype.ne = function(t) {
        for (var e = 0, n = this.Mt; e < n.length; e++) {
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
        return !(this.startAt && !this.startAt._e(this.orderBy, t) || this.endAt && this.endAt._e(this.orderBy, t));
    }, t.prototype.Qt = function(t) {}, t;
}(), wt = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this) || this).field = e, i.op = n, i.value = r, i;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    return e.__extends(n, t), n.create = function(t, e, r) {
        if (t.Y()) return "in" /* IN */ === e ? new bt(t, r) : new _t(t, e, r);
        if (z(r)) {
            if ("==" /* EQUAL */ !== e) throw new c(h.INVALID_ARGUMENT, "Invalid query. Null supports only equality comparisons.");
            return new n(t, e, r);
        }
        if (Q(r)) {
            if ("==" /* EQUAL */ !== e) throw new c(h.INVALID_ARGUMENT, "Invalid query. NaN supports only equality comparisons.");
            return new n(t, e, r);
        }
        return "array-contains" /* ARRAY_CONTAINS */ === e ? new Et(t, r) : "in" /* IN */ === e ? new Tt(t, r) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new At(t, r) : new n(t, e, r);
    }, n.prototype.matches = function(t) {
        var e = t.field(this.field);
        // Only compare types with matching backend order (such as double and int).
                return null !== e && L(this.value) === L(e) && this.fe(U(e, this.value));
    }, n.prototype.fe = function(t) {
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
            return ve();
        }
    }, n.prototype.ue = function() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ ].indexOf(this.op) >= 0;
    }, n.prototype.canonicalId = function() {
        // TODO(b/29183165): Technically, this won't be unique if two values have
        // the same description, such as the int 3 and the string "3". So we should
        // add the types in here somehow, too.
        return this.field.j() + this.op.toString() + P(this.value);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n && this.op === t.op && this.field.isEqual(t.field) && M(this.value, t.value);
    }, n.prototype.toString = function() {
        return this.field.j() + " " + this.op + " " + P(this.value);
    }, n;
}((function() {})), _t = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this, e, n, r) || this).key = E.Z(r.referenceValue), i;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = E.N(t.key, this.key);
        return this.fe(e);
    }, n;
}(wt), bt = /** @class */ function(t) {
    function n(e, n) {
        var r = this;
        return (r = t.call(this, e, "in" /* IN */ , n) || this).keys = (n.arrayValue.values || []).map((function(t) {
            return E.Z(t.referenceValue);
        })), r;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        return this.keys.some((function(e) {
            return e.isEqual(t.key);
        }));
    }, n;
}(wt), Et = /** @class */ function(t) {
    function n(e, n) {
        return t.call(this, e, "array-contains" /* ARRAY_CONTAINS */ , n) || this;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = t.field(this.field);
        return B(e) && q(e.arrayValue, this.value);
    }, n;
}(wt), Tt = /** @class */ function(t) {
    function n(e, n) {
        return t.call(this, e, "in" /* IN */ , n) || this;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = t.field(this.field);
        return null !== e && q(this.value.arrayValue, e);
    }, n;
}(wt), At = /** @class */ function(t) {
    function n(e, n) {
        return t.call(this, e, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n) || this;
    }
    return e.__extends(n, t), n.prototype.matches = function(t) {
        var e = this, n = t.field(this.field);
        return !(!B(n) || !n.arrayValue.values) && n.arrayValue.values.some((function(t) {
            return q(e.value.arrayValue, t);
        }));
    }, n;
}(wt), It = /** @class */ function() {
    function t(t, e) {
        this.position = t, this.before = e;
    }
    return t.prototype.canonicalId = function() {
        // TODO(b/29183165): Make this collision robust.
        return (this.before ? "b" : "a") + ":" + this.position.map((function(t) {
            return P(t);
        })).join(",");
    }, 
    /**
     * Returns true if a document sorts before a bound using the provided sort
     * order.
     */
    t.prototype._e = function(t, e) {
        for (var n = 0, r = 0; r < this.position.length; r++) {
            var i = t[r], o = this.position[r];
            if (n = i.field.Y() ? E.N(E.Z(o.referenceValue), e.key) : U(o, e.field(i.field)), 
            "desc" /* DESCENDING */ === i.dir && (n *= -1), 0 !== n) break;
        }
        return this.before ? n <= 0 : n < 0;
    }, t.prototype.isEqual = function(t) {
        if (null === t) return !1;
        if (this.before !== t.before || this.position.length !== t.position.length) return !1;
        for (var e = 0; e < this.position.length; e++) if (!M(this.position[e], t.position[e])) return !1;
        return !0;
    }, t;
}(), Nt = /** @class */ function() {
    function t(t, e) {
        this.field = t, void 0 === e && (e = "asc" /* ASCENDING */), this.dir = e, this.de = t.Y();
    }
    return t.prototype.compare = function(t, e) {
        var n = this.de ? E.N(t.key, e.key) : function(t, e, n) {
            var r = e.field(t), i = n.field(t);
            return null !== r && null !== i ? U(r, i) : ve();
        }(this.field, t, e);
        switch (this.dir) {
          case "asc" /* ASCENDING */ :
            return n;

          case "desc" /* DESCENDING */ :
            return -1 * n;

          default:
            return ve();
        }
    }, t.prototype.canonicalId = function() {
        // TODO(b/29183165): Make this collision robust.
        return this.field.j() + this.dir.toString();
    }, t.prototype.toString = function() {
        return this.field.j() + " (" + this.dir + ")";
    }, t.prototype.isEqual = function(t) {
        return this.dir === t.dir && this.field.isEqual(t.field);
    }, t;
}(), Dt = /** @class */ function() {
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
        void 0 === i && (i = m.min()), void 0 === o && (o = m.min()), void 0 === s && (s = N.ht), 
        this.target = t, this.targetId = e, this.Te = n, this.sequenceNumber = r, this.we = i, 
        this.lastLimboFreeSnapshotVersion = o, this.resumeToken = s;
    }
    /** Creates a new target data instance with an updated sequence number. */    return t.prototype.Ee = function(e) {
        return new t(this.target, this.targetId, this.Te, e, this.we, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }, 
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */
    t.prototype.me = function(e, n) {
        return new t(this.target, this.targetId, this.Te, this.sequenceNumber, n, this.lastLimboFreeSnapshotVersion, e);
    }, 
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */
    t.prototype.Ie = function(e) {
        return new t(this.target, this.targetId, this.Te, this.sequenceNumber, this.we, e, this.resumeToken);
    }, t;
}(), Rt = 
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
function Vt(t) {
    switch (t) {
      case h.OK:
        return ve();

      case h.CANCELLED:
      case h.UNKNOWN:
      case h.DEADLINE_EXCEEDED:
      case h.RESOURCE_EXHAUSTED:
      case h.INTERNAL:
      case h.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case h.UNAUTHENTICATED:
        return !1;

      case h.INVALID_ARGUMENT:
      case h.NOT_FOUND:
      case h.ALREADY_EXISTS:
      case h.PERMISSION_DENIED:
      case h.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case h.ABORTED:
      case h.OUT_OF_RANGE:
      case h.UNIMPLEMENTED:
      case h.DATA_LOSS:
        return !0;

      default:
        return ve();
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
 */ function kt(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return de("GRPC error has no .code"), h.UNKNOWN;
    switch (t) {
      case ft.OK:
        return h.OK;

      case ft.CANCELLED:
        return h.CANCELLED;

      case ft.UNKNOWN:
        return h.UNKNOWN;

      case ft.DEADLINE_EXCEEDED:
        return h.DEADLINE_EXCEEDED;

      case ft.RESOURCE_EXHAUSTED:
        return h.RESOURCE_EXHAUSTED;

      case ft.INTERNAL:
        return h.INTERNAL;

      case ft.UNAVAILABLE:
        return h.UNAVAILABLE;

      case ft.UNAUTHENTICATED:
        return h.UNAUTHENTICATED;

      case ft.INVALID_ARGUMENT:
        return h.INVALID_ARGUMENT;

      case ft.NOT_FOUND:
        return h.NOT_FOUND;

      case ft.ALREADY_EXISTS:
        return h.ALREADY_EXISTS;

      case ft.PERMISSION_DENIED:
        return h.PERMISSION_DENIED;

      case ft.FAILED_PRECONDITION:
        return h.FAILED_PRECONDITION;

      case ft.ABORTED:
        return h.ABORTED;

      case ft.OUT_OF_RANGE:
        return h.OUT_OF_RANGE;

      case ft.UNIMPLEMENTED:
        return h.UNIMPLEMENTED;

      case ft.DATA_LOSS:
        return h.DATA_LOSS;

      default:
        return ve();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (lt = ft || (ft = {}))[lt.OK = 0] = "OK", lt[lt.CANCELLED = 1] = "CANCELLED", 
lt[lt.UNKNOWN = 2] = "UNKNOWN", lt[lt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
lt[lt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", lt[lt.NOT_FOUND = 5] = "NOT_FOUND", 
lt[lt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", lt[lt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
lt[lt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", lt[lt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
lt[lt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", lt[lt.ABORTED = 10] = "ABORTED", 
lt[lt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", lt[lt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
lt[lt.INTERNAL = 13] = "INTERNAL", lt[lt.UNAVAILABLE = 14] = "UNAVAILABLE", lt[lt.DATA_LOSS = 15] = "DATA_LOSS";

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
var St = /** @class */ function() {
    function t(t, e) {
        this.N = t, this.root = e || Mt.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
        return t.prototype.Re = function(e, n) {
        return new t(this.N, this.root.Re(e, n, this.N).Ae(null, null, Mt.Pe, null, null));
    }, 
    // Returns a copy of the map, with the specified key removed.
    t.prototype.remove = function(e) {
        return new t(this.N, this.root.remove(e, this.N).Ae(null, null, Mt.Pe, null, null));
    }, 
    // Returns the value of the node with the given key, or null.
    t.prototype.get = function(t) {
        for (var e = this.root; !e.M(); ) {
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
        var e = 0, n = this.root; !n.M(); ) {
            var r = this.N(t, n.key);
            if (0 === r) return e + n.left.size;
            r < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }, t.prototype.M = function() {
        return this.root.M();
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
    t.prototype.pe = function() {
        return this.root.pe();
    }, 
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ye = function(t) {
        return this.root.ye(t);
    }, t.prototype.forEach = function(t) {
        this.ye((function(e, n) {
            return t(e, n), !1;
        }));
    }, t.prototype.toString = function() {
        var t = [];
        return this.ye((function(e, n) {
            return t.push(e + ":" + n), !1;
        })), "{" + t.join(", ") + "}";
    }, 
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ge = function(t) {
        return this.root.ge(t);
    }, 
    // Returns an iterator over the SortedMap.
    t.prototype.be = function() {
        return new Lt(this.root, null, this.N, !1);
    }, t.prototype.ve = function(t) {
        return new Lt(this.root, t, this.N, !1);
    }, t.prototype.Se = function() {
        return new Lt(this.root, null, this.N, !0);
    }, t.prototype.Ce = function(t) {
        return new Lt(this.root, t, this.N, !0);
    }, t;
}(), Lt = /** @class */ function() {
    function t(t, e, n, r) {
        this.De = r, this.Fe = [];
        for (var i = 1; !t.M(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        r && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.De ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.Fe.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
                        this.Fe.push(t), t = this.De ? t.right : t.left;
        }
    }
    return t.prototype.Ne = function() {
        var t = this.Fe.pop(), e = {
            key: t.key,
            value: t.value
        };
        if (this.De) for (t = t.left; !t.M(); ) this.Fe.push(t), t = t.right; else for (t = t.right; !t.M(); ) this.Fe.push(t), 
        t = t.left;
        return e;
    }, t.prototype.$e = function() {
        return this.Fe.length > 0;
    }, t.prototype.Le = function() {
        if (0 === this.Fe.length) return null;
        var t = this.Fe[this.Fe.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }, t;
}(), Mt = /** @class */ function() {
    function t(e, n, r, i, o) {
        this.key = e, this.value = n, this.color = null != r ? r : t.RED, this.left = null != i ? i : t.EMPTY, 
        this.right = null != o ? o : t.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
        return t.prototype.Ae = function(e, n, r, i, o) {
        return new t(null != e ? e : this.key, null != n ? n : this.value, null != r ? r : this.color, null != i ? i : this.left, null != o ? o : this.right);
    }, t.prototype.M = function() {
        return !1;
    }, 
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ye = function(t) {
        return this.left.ye(t) || t(this.key, this.value) || this.right.ye(t);
    }, 
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    t.prototype.ge = function(t) {
        return this.right.ge(t) || t(this.key, this.value) || this.left.ge(t);
    }, 
    // Returns the minimum node in the tree.
    t.prototype.min = function() {
        return this.left.M() ? this : this.left.min();
    }, 
    // Returns the maximum key in the tree.
    t.prototype.Ve = function() {
        return this.min().key;
    }, 
    // Returns the maximum key in the tree.
    t.prototype.pe = function() {
        return this.right.M() ? this.key : this.right.pe();
    }, 
    // Returns new tree, with the key/value added.
    t.prototype.Re = function(t, e, n) {
        var r = this, i = n(t, r.key);
        return (r = i < 0 ? r.Ae(null, null, null, r.left.Re(t, e, n), null) : 0 === i ? r.Ae(null, e, null, null, null) : r.Ae(null, null, null, null, r.right.Re(t, e, n))).ke();
    }, t.prototype.Oe = function() {
        if (this.left.M()) return t.EMPTY;
        var e = this;
        return e.left.qe() || e.left.left.qe() || (e = e.Me()), (e = e.Ae(null, null, null, e.left.Oe(), null)).ke();
    }, 
    // Returns new tree, with the specified item removed.
    t.prototype.remove = function(e, n) {
        var r, i = this;
        if (n(e, i.key) < 0) i.left.M() || i.left.qe() || i.left.left.qe() || (i = i.Me()), 
        i = i.Ae(null, null, null, i.left.remove(e, n), null); else {
            if (i.left.qe() && (i = i.xe()), i.right.M() || i.right.qe() || i.right.left.qe() || (i = i.Be()), 
            0 === n(e, i.key)) {
                if (i.right.M()) return t.EMPTY;
                r = i.right.min(), i = i.Ae(r.key, r.value, null, null, i.right.Oe());
            }
            i = i.Ae(null, null, null, null, i.right.remove(e, n));
        }
        return i.ke();
    }, t.prototype.qe = function() {
        return this.color;
    }, 
    // Returns new tree after performing any needed rotations.
    t.prototype.ke = function() {
        var t = this;
        return t.right.qe() && !t.left.qe() && (t = t.Ue()), t.left.qe() && t.left.left.qe() && (t = t.xe()), 
        t.left.qe() && t.right.qe() && (t = t.Qe()), t;
    }, t.prototype.Me = function() {
        var t = this.Qe();
        return t.right.left.qe() && (t = (t = (t = t.Ae(null, null, null, null, t.right.xe())).Ue()).Qe()), 
        t;
    }, t.prototype.Be = function() {
        var t = this.Qe();
        return t.left.left.qe() && (t = (t = t.xe()).Qe()), t;
    }, t.prototype.Ue = function() {
        var e = this.Ae(null, null, t.RED, null, this.right.left);
        return this.right.Ae(null, null, this.color, e, null);
    }, t.prototype.xe = function() {
        var e = this.Ae(null, null, t.RED, this.left.right, null);
        return this.left.Ae(null, null, this.color, null, e);
    }, t.prototype.Qe = function() {
        var t = this.left.Ae(null, null, !this.left.color, null, null), e = this.right.Ae(null, null, !this.right.color, null, null);
        return this.Ae(null, null, !this.color, t, e);
    }, 
    // For testing.
    t.prototype.We = function() {
        var t = this.je();
        return Math.pow(2, t) <= this.size + 1;
    }, 
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    t.prototype.je = function() {
        if (this.qe() && this.left.qe()) throw ve();
        if (this.right.qe()) throw ve();
        var t = this.left.je();
        if (t !== this.right.je()) throw ve();
        return t + (this.qe() ? 0 : 1);
    }, t;
}();

// end SortedMap
// An iterator over an LLRBNode.
// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Mt.EMPTY = null, Mt.RED = !0, Mt.Pe = !1, 
// end LLRBEmptyNode
Mt.EMPTY = new (/** @class */ function() {
    function t() {
        this.size = 0;
    }
    return Object.defineProperty(t.prototype, "key", {
        get: function() {
            throw ve();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "value", {
        get: function() {
            throw ve();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "color", {
        get: function() {
            throw ve();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "left", {
        get: function() {
            throw ve();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "right", {
        get: function() {
            throw ve();
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Returns a copy of the current node.
    t.prototype.Ae = function(t, e, n, r, i) {
        return this;
    }, 
    // Returns a copy of the tree, with the specified key/value added.
    t.prototype.Re = function(t, e, n) {
        return new Mt(t, e);
    }, 
    // Returns a copy of the tree, with the specified key removed.
    t.prototype.remove = function(t, e) {
        return this;
    }, t.prototype.M = function() {
        return !0;
    }, t.prototype.ye = function(t) {
        return !1;
    }, t.prototype.ge = function(t) {
        return !1;
    }, t.prototype.Ve = function() {
        return null;
    }, t.prototype.pe = function() {
        return null;
    }, t.prototype.qe = function() {
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
var qt = /** @class */ function() {
    function t(t) {
        this.N = t, this.data = new St(this.N);
    }
    return t.prototype.has = function(t) {
        return null !== this.data.get(t);
    }, t.prototype.first = function() {
        return this.data.Ve();
    }, t.prototype.last = function() {
        return this.data.pe();
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
        this.data.ye((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Iterates over `elem`s such that: range[0] <= elem < range[1]. */ t.prototype.Ge = function(t, e) {
        for (var n = this.data.ve(t[0]); n.$e(); ) {
            var r = n.Ne();
            if (this.N(r.key, t[1]) >= 0) return;
            e(r.key);
        }
    }, 
    /**
     * Iterates over `elem`s such that: start <= elem until false is returned.
     */
    t.prototype.He = function(t, e) {
        var n;
        for (n = void 0 !== e ? this.data.ve(e) : this.data.be(); n.$e(); ) if (!t(n.Ne().key)) return;
    }, 
    /** Finds the least element greater than or equal to `elem`. */ t.prototype.Ke = function(t) {
        var e = this.data.ve(t);
        return e.$e() ? e.Ne().key : null;
    }, t.prototype.be = function() {
        return new Ut(this.data.be());
    }, t.prototype.ve = function(t) {
        return new Ut(this.data.ve(t));
    }, 
    /** Inserts or updates an element */ t.prototype.add = function(t) {
        return this.Ae(this.data.remove(t).Re(t, !0));
    }, 
    /** Deletes an element */ t.prototype.delete = function(t) {
        return this.has(t) ? this.Ae(this.data.remove(t)) : this;
    }, t.prototype.M = function() {
        return this.data.M();
    }, t.prototype.ze = function(t) {
        var e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((function(t) {
            e = e.add(t);
        })), e;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.data.be(), r = e.data.be(); n.$e(); ) {
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
    }, t.prototype.Ae = function(e) {
        var n = new t(this.N);
        return n.data = e, n;
    }, t;
}(), Ut = /** @class */ function() {
    function t(t) {
        this.Ye = t;
    }
    return t.prototype.Ne = function() {
        return this.Ye.Ne().key;
    }, t.prototype.$e = function() {
        return this.Ye.$e();
    }, t;
}(), Ot = new St(E.N);

function Pt() {
    return Ot;
}

function Ct() {
    return Pt();
}

var xt = new St(E.N);

function Ft() {
    return xt;
}

var jt = new St(E.N);

function Gt() {
    return jt;
}

var Bt = new qt(E.N);

function zt() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    for (var n = Bt, r = 0, i = t; r < i.length; r++) {
        var o = i[r];
        n = n.add(o);
    }
    return n;
}

var Qt = new qt(_e);

function Wt() {
    return Qt;
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
 */ var Jt = /** @class */ function() {
    /** The default ordering is by key if the comparator is omitted */
    function t(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.N = t ? function(e, n) {
            return t(e, n) || E.N(e.key, n.key);
        } : function(t, e) {
            return E.N(t.key, e.key);
        }, this.Xe = Ft(), this.Je = new St(this.N)
        /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */;
    }
    return t.Ze = function(e) {
        return new t(e.N);
    }, t.prototype.has = function(t) {
        return null != this.Xe.get(t);
    }, t.prototype.get = function(t) {
        return this.Xe.get(t);
    }, t.prototype.first = function() {
        return this.Je.Ve();
    }, t.prototype.last = function() {
        return this.Je.pe();
    }, t.prototype.M = function() {
        return this.Je.M();
    }, 
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */
    t.prototype.indexOf = function(t) {
        var e = this.Xe.get(t);
        return e ? this.Je.indexOf(e) : -1;
    }, Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.Je.size;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Iterates documents in order defined by "comparator" */ t.prototype.forEach = function(t) {
        this.Je.ye((function(e, n) {
            return t(e), !1;
        }));
    }, 
    /** Inserts or updates a document with the same key */ t.prototype.add = function(t) {
        // First remove the element if we have it.
        var e = this.delete(t.key);
        return e.Ae(e.Xe.Re(t.key, t), e.Je.Re(t, null));
    }, 
    /** Deletes a document with a given key */ t.prototype.delete = function(t) {
        var e = this.get(t);
        return e ? this.Ae(this.Xe.remove(t), this.Je.remove(e)) : this;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) return !1;
        if (this.size !== e.size) return !1;
        for (var n = this.Je.be(), r = e.Je.be(); n.$e(); ) {
            var i = n.Ne().key, o = r.Ne().key;
            if (!i.isEqual(o)) return !1;
        }
        return !0;
    }, t.prototype.toString = function() {
        var t = [];
        return this.forEach((function(e) {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }, t.prototype.Ae = function(e, n) {
        var r = new t;
        return r.N = this.N, r.Xe = e, r.Je = n, r;
    }, t;
}(), Ht = /** @class */ function() {
    function t() {
        this.ts = new St(E.N);
    }
    return t.prototype.track = function(t) {
        var e = t.doc.key, n = this.ts.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.ts = this.ts.Re(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.ts = this.ts.Re(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.ts = this.ts.Re(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.ts = this.ts.Re(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.ts = this.ts.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.ts = this.ts.Re(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.ts = this.ts.Re(e, {
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
        ve() : this.ts = this.ts.Re(e, t);
    }, t.prototype.es = function() {
        var t = [];
        return this.ts.ye((function(e, n) {
            t.push(n);
        })), t;
    }, t;
}(), Xt = /** @class */ function() {
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
        })), new t(e, n, Jt.Ze(n), o, r, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }, Object.defineProperty(t.prototype, "hasPendingWrites", {
        get: function() {
            return !this.ns.M();
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
}(), Yt = /** @class */ function() {
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
        this.we = t, this.as = e, this.us = n, this.cs = r, this.ls = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
        return t._s = function(e, n) {
        var r = new Map;
        return r.set(e, Zt.fs(e, n)), new t(m.min(), r, Wt(), Pt(), zt());
    }, t;
}(), Zt = /** @class */ function() {
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
        this.resumeToken = t, this.ds = e, this.Ts = n, this.ws = r, this.Es = i
        /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */;
    }
    return t.fs = function(e, n) {
        return new t(N.ht, n, zt(), zt(), zt());
    }, t;
}(), Kt = function(
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
    this.ms = t, this.removedTargetIds = e, this.key = n, this.Is = r;
}, $t = function(t, e) {
    this.targetId = t, this.Rs = e;
}, te = function(
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
    void 0 === n && (n = N.ht), void 0 === r && (r = null), this.state = t, this.targetIds = e, 
    this.resumeToken = n, this.cause = r;
}, ee = /** @class */ function() {
    function t() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.As = 0, 
        /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
        this.Ps = ie(), 
        /** See public getters for explanations of these fields. */
        this.Vs = N.ht, this.ps = !1, 
        /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
        this.ys = !0;
    }
    return Object.defineProperty(t.prototype, "ds", {
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */
        get: function() {
            return this.ps;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "resumeToken", {
        /** The last resume token sent to us for this target. */ get: function() {
            return this.Vs;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "gs", {
        /** Whether this target has pending target adds or target removes. */ get: function() {
            return 0 !== this.As;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "bs", {
        /** Whether we have modified any state that should trigger a snapshot. */ get: function() {
            return this.ys;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */
    t.prototype.vs = function(t) {
        t.rt() > 0 && (this.ys = !0, this.Vs = t);
    }, 
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */
    t.prototype.Ss = function() {
        var t = zt(), e = zt(), n = zt();
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
                ve();
            }
        })), new Zt(this.Vs, this.ps, t, e, n);
    }, 
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */
    t.prototype.Cs = function() {
        this.ys = !1, this.Ps = ie();
    }, t.prototype.Ds = function(t, e) {
        this.ys = !0, this.Ps = this.Ps.Re(t, e);
    }, t.prototype.Fs = function(t) {
        this.ys = !0, this.Ps = this.Ps.remove(t);
    }, t.prototype.Ns = function() {
        this.As += 1;
    }, t.prototype.$s = function() {
        this.As -= 1;
    }, t.prototype.Ls = function() {
        this.ys = !0, this.ps = !0;
    }, t;
}(), ne = /** @class */ function() {
    function t(t) {
        this.ks = t, 
        /** The internal state of all tracked targets. */
        this.Os = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.qs = Pt(), 
        /** A mapping of document keys to their set of target IDs. */
        this.Ms = re(), 
        /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
        this.xs = new qt(_e)
        /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */;
    }
    return t.prototype.Bs = function(t) {
        for (var e = 0, n = t.ms; e < n.length; e++) {
            var r = n[e];
            t.Is instanceof dt ? this.Us(r, t.Is) : t.Is instanceof yt && this.Qs(r, t.key, t.Is);
        }
        for (var i = 0, o = t.removedTargetIds; i < o.length; i++) {
            var s = o[i];
            this.Qs(s, t.key, t.Is);
        }
    }, 
    /** Processes and adds the WatchTargetChange to the current set of changes. */ t.prototype.Ws = function(t) {
        var e = this;
        this.js(t, (function(n) {
            var r = e.Gs(n);
            switch (t.state) {
              case 0 /* NoChange */ :
                e.Hs(n) && r.vs(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.$s(), r.gs || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                r.Cs(), r.vs(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                r.$s(), r.gs || e.removeTarget(n);
                break;

              case 3 /* Current */ :
                e.Hs(n) && (r.Ls(), r.vs(t.resumeToken));
                break;

              case 4 /* Reset */ :
                e.Hs(n) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                e.Ks(n), r.vs(t.resumeToken));
                break;

              default:
                ve();
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
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Os.forEach((function(t, r) {
            n.Hs(r) && e(r);
        }));
    }, 
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */
    t.prototype.zs = function(t) {
        var e = t.targetId, n = t.Rs.count, r = this.Ys(e);
        if (r) {
            var i = r.target;
            if (i.qt()) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                var o = new E(i.path);
                this.Qs(e, o, new yt(o, m.min()));
            } else me(1 === n); else this.Xs(e) !== n && (
            // Existence filter mismatch: We reset the mapping and raise a new
            // snapshot with `isFromCache:true`.
            this.Ks(e), this.xs = this.xs.add(e));
        }
    }, 
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */
    t.prototype.Js = function(t) {
        var e = this, n = new Map;
        this.Os.forEach((function(r, i) {
            var o = e.Ys(i);
            if (o) {
                if (r.ds && o.target.qt()) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    var s = new E(o.target.path);
                    null !== e.qs.get(s) || e.Zs(i, s) || e.Qs(i, s, new yt(s, t));
                }
                r.bs && (n.set(i, r.Ss()), r.Cs());
            }
        }));
        var r = zt();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.Ms.forEach((function(t, n) {
            var i = !0;
            n.He((function(t) {
                var n = e.Ys(t);
                return !n || 2 /* LimboResolution */ === n.Te || (i = !1, !1);
            })), i && (r = r.add(t));
        }));
        var i = new Yt(t, n, this.xs, this.qs, r);
        return this.qs = Pt(), this.Ms = re(), this.xs = new qt(_e), i;
    }, 
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    t.prototype.Us = function(t, e) {
        if (this.Hs(t)) {
            var n = this.Zs(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.Gs(t).Ds(e.key, n), this.qs = this.qs.Re(e.key, e), this.Ms = this.Ms.Re(e.key, this.ti(e.key).add(t));
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
        if (this.Hs(t)) {
            var r = this.Gs(t);
            this.Zs(t, e) ? r.Ds(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            r.Fs(e), this.Ms = this.Ms.Re(e, this.ti(e).delete(t)), n && (this.qs = this.qs.Re(e, n));
        }
    }, t.prototype.removeTarget = function(t) {
        this.Os.delete(t);
    }, 
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */
    t.prototype.Xs = function(t) {
        var e = this.Gs(t).Ss();
        return this.ks.ei(t).size + e.Ts.size - e.Es.size;
    }, 
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */
    t.prototype.Ns = function(t) {
        this.Gs(t).Ns();
    }, t.prototype.Gs = function(t) {
        var e = this.Os.get(t);
        return e || (e = new ee, this.Os.set(t, e)), e;
    }, t.prototype.ti = function(t) {
        var e = this.Ms.get(t);
        return e || (e = new qt(_e), this.Ms = this.Ms.Re(t, e)), e;
    }, 
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */
    t.prototype.Hs = function(t) {
        var e = null !== this.Ys(t);
        return e || pe("WatchChangeAggregator", "Detected inactive target", t), e;
    }, 
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */
    t.prototype.Ys = function(t) {
        var e = this.Os.get(t);
        return e && e.gs ? null : this.ks.si(t);
    }, 
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */
    t.prototype.Ks = function(t) {
        var e = this;
        this.Os.set(t, new ee), this.ks.ei(t).forEach((function(n) {
            e.Qs(t, n, /*updatedDocument=*/ null);
        }));
    }, 
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */
    t.prototype.Zs = function(t, e) {
        return this.ks.ei(t).has(e);
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
 */ function re() {
    return new St(E.N);
}

function ie() {
    return new St(E.N);
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
 */ var oe = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}, se = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}, ue = /** @class */ function() {
    function t(t, e) {
        this.ii = t, this.options = e;
    }
    return t.prototype.ni = function(t) {
        var e = void 0 === t.code ? h.UNKNOWN : kt(t.code);
        return new c(e, t.message || "");
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
        return this.options.hi || D(t) ? t : {
            value: t
        };
    }, 
    /**
     * Returns a number (or null) from a google.protobuf.Int32Value proto.
     */
    t.prototype.oi = function(t) {
        var e;
        return D(e = "object" == typeof t ? t.value : t) ? null : e;
    }, 
    /**
     * Returns an IntegerValue for `value`.
     */
    t.prototype.lt = function(t) {
        return {
            integerValue: "" + t
        };
    }, 
    /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */
    t.prototype._t = function(t) {
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
            doubleValue: R(t) ? "-0" : t
        };
    }, 
    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */
    t.prototype.ai = function(t) {
        return function(t) {
            return "number" == typeof t && Number.isInteger(t) && !R(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
        }(t) ? this.lt(t) : this._t(t);
    }, 
    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */
    t.prototype.D = function(t) {
        return this.options.hi ? new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "") + "." + ("000000000" + t.nanoseconds).slice(-9) + "Z" : {
            seconds: "" + t.seconds,
            nanos: t.nanoseconds
        };
    }, t.prototype.v = function(t) {
        var e = C(t);
        return new v(e.seconds, e.nanos);
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
        return this.options.hi ? (me(void 0 === t || "string" == typeof t), N.fromBase64String(t || "")) : (me(void 0 === t || t instanceof Uint8Array), 
        N.fromUint8Array(t || new Uint8Array));
    }, t.prototype.toVersion = function(t) {
        return this.D(t.D());
    }, t.prototype.fromVersion = function(t) {
        return me(!!t), m.v(this.v(t));
    }, t.prototype.li = function(t, e) {
        return this._i(e || this.ii).child("documents").child(t).j();
    }, t.prototype.fi = function(t) {
        var e = w.G(t);
        return me(ae(e)), e;
    }, t.prototype.di = function(t) {
        return this.li(t.path);
    }, t.prototype.Z = function(t) {
        var e = this.fi(t);
        return me(e.get(1) === this.ii.projectId), me(!e.get(3) && !this.ii.database || e.get(3) === this.ii.database), 
        new E(this.Ti(e));
    }, t.prototype.wi = function(t) {
        return this.li(t);
    }, t.prototype.Ei = function(t) {
        var e = this.fi(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
                return 4 === e.length ? w.H : this.Ti(e);
    }, Object.defineProperty(t.prototype, "mi", {
        get: function() {
            return new w([ "projects", this.ii.projectId, "databases", this.ii.database ]).j();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype._i = function(t) {
        return new w([ "projects", t.projectId, "databases", t.database ]);
    }, t.prototype.Ti = function(t) {
        return me(t.length > 4 && "documents" === t.get(4)), t.L(5);
    }, 
    /** Creates an api.Document from key and fields (but no create/update time) */ t.prototype.Ii = function(t, e) {
        return {
            name: this.di(t),
            fields: e.proto.mapValue.fields
        };
    }, t.prototype.Ri = function(t) {
        return {
            name: this.di(t.key),
            fields: t.kt().mapValue.fields,
            updateTime: this.D(t.version.D())
        };
    }, t.prototype.Ai = function(t, e) {
        var n = this.Z(t.name), r = this.fromVersion(t.updateTime), i = new at({
            mapValue: {
                fields: t.fields
            }
        });
        return new dt(n, r, i, {
            hasCommittedMutations: !!e
        });
    }, t.prototype.Pi = function(t) {
        me(!!t.found), t.found.name, t.found.updateTime;
        var e = this.Z(t.found.name), n = this.fromVersion(t.found.updateTime), r = new at({
            mapValue: {
                fields: t.found.fields
            }
        });
        return new dt(e, n, r, {});
    }, t.prototype.Vi = function(t) {
        me(!!t.missing), me(!!t.readTime);
        var e = this.Z(t.missing), n = this.fromVersion(t.readTime);
        return new yt(e, n);
    }, t.prototype.pi = function(t) {
        return "found" in t ? this.Pi(t) : "missing" in t ? this.Vi(t) : ve();
    }, t.prototype.yi = function(t) {
        var e;
        if ("targetChange" in t) {
            t.targetChange;
            // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
            // if unset
            var n = this.gi(t.targetChange.targetChangeType || "NO_CHANGE"), r = t.targetChange.targetIds || [], i = this.ci(t.targetChange.resumeToken), o = t.targetChange.cause, s = o && this.ni(o);
            e = new te(n, r, i, s || null);
        } else if ("documentChange" in t) {
            t.documentChange;
            var u = t.documentChange;
            u.document, u.document.name, u.document.updateTime;
            var a = this.Z(u.document.name), h = this.fromVersion(u.document.updateTime), c = new at({
                mapValue: {
                    fields: u.document.fields
                }
            }), f = new dt(a, h, c, {}), l = u.targetIds || [], p = u.removedTargetIds || [];
            e = new Kt(l, p, f.key, f);
        } else if ("documentDelete" in t) {
            t.documentDelete;
            var d = t.documentDelete;
            d.document;
            var y = this.Z(d.document), v = d.readTime ? this.fromVersion(d.readTime) : m.min(), g = new yt(y, v), w = d.removedTargetIds || [];
            e = new Kt([], w, g.key, g);
        } else if ("documentRemove" in t) {
            t.documentRemove;
            var _ = t.documentRemove;
            _.document;
            var b = this.Z(_.document), E = _.removedTargetIds || [];
            e = new Kt([], E, b, null);
        } else {
            if (!("filter" in t)) return ve();
            t.filter;
            var T = t.filter;
            T.targetId;
            var A = T.count || 0, I = new Rt(A), N = T.targetId;
            e = new $t(N, I);
        }
        return e;
    }, t.prototype.gi = function(t) {
        return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : ve();
    }, t.prototype.bi = function(t) {
        // We have only reached a consistent snapshot for the entire stream if there
        // is a read_time set and it applies to all targets (i.e. the list of
        // targets is empty). The backend is guaranteed to send such responses.
        if (!("targetChange" in t)) return m.min();
        var e = t.targetChange;
        return e.targetIds && e.targetIds.length ? m.min() : e.readTime ? this.fromVersion(e.readTime) : m.min();
    }, t.prototype.vi = function(t) {
        var e, n = this;
        if (t instanceof rt) e = {
            update: this.Ii(t.key, t.value)
        }; else if (t instanceof st) e = {
            delete: this.di(t.key)
        }; else if (t instanceof it) e = {
            update: this.Ii(t.key, t.data),
            updateMask: this.Si(t.Vt)
        }; else if (t instanceof ot) e = {
            transform: {
                document: this.di(t.key),
                fieldTransforms: t.fieldTransforms.map((function(t) {
                    return n.Ci(t);
                }))
            }
        }; else {
            if (!(t instanceof ut)) return ve();
            e = {
                verify: this.di(t.key)
            };
        }
        return t.Rt.Tt || (e.currentDocument = this.Di(t.Rt)), e;
    }, t.prototype.Fi = function(t) {
        var e = this, n = t.currentDocument ? this.Ni(t.currentDocument) : et.dt();
        if (t.update) {
            t.update.name;
            var r = this.Z(t.update.name), i = new at({
                mapValue: {
                    fields: t.update.fields
                }
            });
            if (t.updateMask) {
                var o = this.$i(t.updateMask);
                return new it(r, i, o, n);
            }
            return new rt(r, i, n);
        }
        if (t.delete) {
            var s = this.Z(t.delete);
            return new st(s, n);
        }
        if (t.transform) {
            var u = this.Z(t.transform.document), a = t.transform.fieldTransforms.map((function(t) {
                return e.Li(t);
            }));
            return me(!0 === n.exists), new ot(u, a);
        }
        if (t.verify) {
            var h = this.Z(t.verify);
            return new ut(h, n);
        }
        return ve();
    }, t.prototype.Di = function(t) {
        return void 0 !== t.updateTime ? {
            updateTime: this.toVersion(t.updateTime)
        } : void 0 !== t.exists ? {
            exists: t.exists
        } : ve();
    }, t.prototype.Ni = function(t) {
        return void 0 !== t.updateTime ? et.updateTime(this.fromVersion(t.updateTime)) : void 0 !== t.exists ? et.exists(t.exists) : et.dt();
    }, t.prototype.ki = function(t, e) {
        // NOTE: Deletes don't have an updateTime.
        var n = t.updateTime ? this.fromVersion(t.updateTime) : this.fromVersion(e);
        n.isEqual(m.min()) && (
        // The Firestore Emulator currently returns an update time of 0 for
        // deletes of non-existing documents (rather than null). This breaks the
        // test "get deleted doc while offline with source=cache" as NoDocuments
        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
        // TODO(#2149): Remove this when Emulator is fixed
        n = this.fromVersion(e));
        var r = null;
        return t.transformResults && t.transformResults.length > 0 && (r = t.transformResults), 
        new tt(n, r);
    }, t.prototype.Oi = function(t, e) {
        var n = this;
        return t && t.length > 0 ? (me(void 0 !== e), t.map((function(t) {
            return n.ki(t, e);
        }))) : [];
    }, t.prototype.Ci = function(t) {
        var e = t.transform;
        if (e instanceof J) return {
            fieldPath: t.field.j(),
            setToServerValue: "REQUEST_TIME"
        };
        if (e instanceof H) return {
            fieldPath: t.field.j(),
            appendMissingElements: {
                values: e.elements
            }
        };
        if (e instanceof X) return {
            fieldPath: t.field.j(),
            removeAllFromArray: {
                values: e.elements
            }
        };
        if (e instanceof Y) return {
            fieldPath: t.field.j(),
            increment: e.ct
        };
        throw ve();
    }, t.prototype.Li = function(t) {
        var e = null;
        if ("setToServerValue" in t) me("REQUEST_TIME" === t.setToServerValue), e = J.instance; else if ("appendMissingElements" in t) {
            var n = t.appendMissingElements.values || [];
            e = new H(n);
        } else if ("removeAllFromArray" in t) {
            var r = t.removeAllFromArray.values || [];
            e = new X(r);
        } else "increment" in t ? e = new Y(this, t.increment) : ve();
        var i = b.J(t.fieldPath);
        return new $(i, e);
    }, t.prototype.qi = function(t) {
        return {
            documents: [ this.wi(t.path) ]
        };
    }, t.prototype.Mi = function(t) {
        me(1 === t.documents.length);
        var e = t.documents[0];
        return gt.Wt(this.Ei(e)).ee();
    }, t.prototype.xi = function(t) {
        // Dissect the path into parent, collectionId, and optional key filter.
        var e = {
            structuredQuery: {}
        }, n = t.path;
        null !== t.collectionGroup ? (e.parent = this.wi(n), e.structuredQuery.from = [ {
            collectionId: t.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = this.wi(n.k()), e.structuredQuery.from = [ {
            collectionId: n.q()
        } ]);
        var r = this.Bi(t.filters);
        r && (e.structuredQuery.where = r);
        var i = this.Ui(t.orderBy);
        i && (e.structuredQuery.orderBy = i);
        var o = this.ri(t.limit);
        return null !== o && (e.structuredQuery.limit = o), t.startAt && (e.structuredQuery.startAt = this.Qi(t.startAt)), 
        t.endAt && (e.structuredQuery.endAt = this.Qi(t.endAt)), e;
    }, t.prototype.Wi = function(t) {
        var e = this.Ei(t.parent), n = t.structuredQuery, r = n.from ? n.from.length : 0, i = null;
        if (r > 0) {
            me(1 === r);
            var o = n.from[0];
            o.allDescendants ? i = o.collectionId : e = e.child(o.collectionId);
        }
        var s = [];
        n.where && (s = this.ji(n.where));
        var u = [];
        n.orderBy && (u = this.Gi(n.orderBy));
        var a = null;
        n.limit && (a = this.oi(n.limit));
        var h = null;
        n.startAt && (h = this.Hi(n.startAt));
        var c = null;
        return n.endAt && (c = this.Hi(n.endAt)), new gt(e, i, u, s, a, "F" /* First */ , h, c).ee();
    }, t.prototype.Ki = function(t) {
        var e = this.zi(t.Te);
        return null == e ? null : {
            "goog-listen-tags": e
        };
    }, t.prototype.zi = function(t) {
        switch (t) {
          case 0 /* Listen */ :
            return null;

          case 1 /* ExistenceFilterMismatch */ :
            return "existence-filter-mismatch";

          case 2 /* LimboResolution */ :
            return "limbo-document";

          default:
            return ve();
        }
    }, t.prototype.ee = function(t) {
        var e, n = t.target;
        return (e = n.qt() ? {
            documents: this.qi(n)
        } : {
            query: this.xi(n)
        }).targetId = t.targetId, t.resumeToken.rt() > 0 && (e.resumeToken = this.ui(t.resumeToken)), 
        e;
    }, t.prototype.Bi = function(t) {
        var e = this;
        if (0 !== t.length) {
            var n = t.map((function(t) {
                return t instanceof wt ? e.Yi(t) : ve();
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
        return t ? void 0 !== t.unaryFilter ? [ this.Xi(t) ] : void 0 !== t.fieldFilter ? [ this.Ji(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((function(t) {
            return e.ji(t);
        })).reduce((function(t, e) {
            return t.concat(e);
        })) : ve() : [];
    }, t.prototype.Ui = function(t) {
        var e = this;
        if (0 !== t.length) return t.map((function(t) {
            return e.Zi(t);
        }));
    }, t.prototype.Gi = function(t) {
        var e = this;
        return t.map((function(t) {
            return e.tn(t);
        }));
    }, t.prototype.Qi = function(t) {
        return {
            before: t.before,
            values: t.position
        };
    }, t.prototype.Hi = function(t) {
        var e = !!t.before, n = t.values || [];
        return new It(n, e);
    }, 
    // visible for testing
    t.prototype.en = function(t) {
        return oe[t];
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
        return se[t];
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
            return ve();
        }
    }, t.prototype.hn = function(t) {
        return {
            fieldPath: t.j()
        };
    }, t.prototype.on = function(t) {
        return b.J(t.fieldPath);
    }, 
    // visible for testing
    t.prototype.Zi = function(t) {
        return {
            field: this.hn(t.field),
            direction: this.en(t.dir)
        };
    }, t.prototype.tn = function(t) {
        return new Nt(this.on(t.field), this.sn(t.direction));
    }, t.prototype.Ji = function(t) {
        return wt.create(this.on(t.fieldFilter.field), this.rn(t.fieldFilter.op), t.fieldFilter.value);
    }, 
    // visible for testing
    t.prototype.Yi = function(t) {
        if ("==" /* EQUAL */ === t.op) {
            if (Q(t.value)) return {
                unaryFilter: {
                    field: this.hn(t.field),
                    op: "IS_NAN"
                }
            };
            if (z(t.value)) return {
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
    }, t.prototype.Xi = function(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            var e = this.on(t.unaryFilter.field);
            return wt.create(e, "==" /* EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            var n = this.on(t.unaryFilter.field);
            return wt.create(n, "==" /* EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "OPERATOR_UNSPECIFIED":
          default:
            return ve();
        }
    }, t.prototype.Si = function(t) {
        var e = [];
        return t.fields.forEach((function(t) {
            return e.push(t.j());
        })), {
            fieldPaths: e
        };
    }, t.prototype.$i = function(t) {
        var e = t.fieldPaths || [];
        return new K(e.map((function(t) {
            return b.J(t);
        })));
    }, t;
}();

/**
 * Generates JsonObject values for the Datastore API suitable for sending to
 * either GRPC stub methods or via the JSON/HTTP REST API.
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */ function ae(t) {
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
 */ var he = /** @class */ function() {
    function t() {}
    return t.an = function(e) {
        t.platform && ve(), t.platform = e;
    }, t.nt = function() {
        return t.platform || ve(), t.platform;
    }, t;
}(), ce = new r.Logger("@firebase/firestore");

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
function fe() {
    return ce.logLevel;
}

function le(t) {
    ce.logLevel = t;
}

function pe(t) {
    for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
    if (ce.logLevel <= r.LogLevel.DEBUG) {
        var o = n.map(ye);
        ce.debug.apply(ce, e.__spreadArrays([ "Firestore (" + u + "): " + t ], o));
    }
}

function de(t) {
    for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
    if (ce.logLevel <= r.LogLevel.ERROR) {
        var o = n.map(ye);
        ce.error.apply(ce, e.__spreadArrays([ "Firestore (" + u + "): " + t ], o));
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function ye(t) {
    if ("string" == typeof t) return t;
    var e = he.nt();
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
 */ function ve(t) {
    void 0 === t && (t = "Unexpected state");
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
        var e = "FIRESTORE (" + u + ") INTERNAL ASSERTION FAILED: " + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
        throw de(e), new Error(e)
    /**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */;
}

function me(t, e) {
    t || ve();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function ge(t, 
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
 */ var we = /** @class */ function() {
    function t() {}
    return t.cn = function() {
        for (
        // Alphanumeric characters
        var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length, n = ""
        // The largest byte value that is a multiple of `char.length`.
        ; n.length < 20; ) for (var r = he.nt().ln(40), i = 0; i < r.length; ++i) 
        // Only accept values that are [0, maxMultiple), this ensures they can
        // be evenly mapped to indices of `chars` via a modulo operation.
        n.length < 20 && r[i] < e && (n += t.charAt(r[i] % t.length));
        return n;
    }, t;
}();

function _e(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function be(t, e, n) {
    return t.length === e.length && t.every((function(t, r) {
        return n(t, e[r]);
    }));
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
 */ var Ee = 
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
}, Te = /** @class */ function() {
    function t(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    return Object.defineProperty(t.prototype, "_n", {
        get: function() {
            return "(default)" === this.database;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        return e instanceof t && e.projectId === this.projectId && e.database === this.database;
    }, t.prototype.S = function(t) {
        return _e(this.projectId, t.projectId) || _e(this.database, t.database);
    }, t;
}(), Ae = /** @class */ function() {
    function t(t) {
        this.fn = t, 
        /**
             * The inner map for a key -> value pair. Due to the possibility of
             * collisions we keep a list of entries that we do a linear search through
             * to find an actual match. Note that collisions should be rare, so we still
             * expect near constant time lookups in practice.
             */
        this.dn = {}
        /** Get a value for this key, or undefined if it does not exist. */;
    }
    return t.prototype.get = function(t) {
        var e = this.fn(t), n = this.dn[e];
        if (void 0 !== n) for (var r = 0, i = n; r < i.length; r++) {
            var o = i[r], s = o[0], u = o[1];
            if (s.isEqual(t)) return u;
        }
    }, t.prototype.has = function(t) {
        return void 0 !== this.get(t);
    }, 
    /** Put this key and value in the map. */ t.prototype.set = function(t, e) {
        var n = this.fn(t), r = this.dn[n];
        if (void 0 !== r) {
            for (var i = 0; i < r.length; i++) if (r[i][0].isEqual(t)) return void (r[i] = [ t, e ]);
            r.push([ t, e ]);
        } else this.dn[n] = [ [ t, e ] ];
    }, 
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */
    t.prototype.delete = function(t) {
        var e = this.fn(t), n = this.dn[e];
        if (void 0 === n) return !1;
        for (var r = 0; r < n.length; r++) if (n[r][0].isEqual(t)) return 1 === n.length ? delete this.dn[e] : n.splice(r, 1), 
        !0;
        return !1;
    }, t.prototype.forEach = function(t) {
        A(this.dn, (function(e, n) {
            for (var r = 0, i = n; r < i.length; r++) {
                var o = i[r], s = o[0], u = o[1];
                t(s, u);
            }
        }));
    }, t.prototype.M = function() {
        return I(this.dn);
    }, t;
}(), Ie = /** @class */ function() {
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
        for (var r = n.wn, i = 0; i < this.mutations.length; i++) {
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
    t.prototype.En = function(t) {
        var e = this, n = t;
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
                return this.mutations.forEach((function(r) {
            var i = e.ot(r.key, t.get(r.key));
            i && (n = n.Re(r.key, i));
        })), n;
    }, t.prototype.keys = function() {
        return this.mutations.reduce((function(t, e) {
            return t.add(e.key);
        }), zt());
    }, t.prototype.isEqual = function(t) {
        return this.batchId === t.batchId && be(this.mutations, t.mutations, (function(t, e) {
            return t.isEqual(e);
        })) && be(this.baseMutations, t.baseMutations, (function(t, e) {
            return t.isEqual(e);
        }));
    }, t;
}(), Ne = /** @class */ function() {
    function t(t, e, n, r, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    i) {
        this.batch = t, this.mn = e, this.wn = n, this.streamToken = r, this.In = i
        /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=>version mapping (docVersions).
     */;
    }
    return t.from = function(e, n, r, i) {
        me(e.mutations.length === r.length);
        for (var o = Gt(), s = e.mutations, u = 0; u < s.length; u++) o = o.Re(s[u].key, r[u].version);
        return new t(e, n, r, i, o);
    }, t;
}(), De = /** @class */ function() {
    function t(t) {
        var e = this;
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
                this.Rn = null, this.An = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.Pn = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.Vn = !1, t((function(t) {
            e.Pn = !0, e.result = t, e.Rn && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            e.Rn(t);
        }), (function(t) {
            e.Pn = !0, e.error = t, e.An && e.An(t);
        }));
    }
    return t.prototype.catch = function(t) {
        return this.next(void 0, t);
    }, t.prototype.next = function(e, n) {
        var r = this;
        return this.Vn && ve(), this.Vn = !0, this.Pn ? this.error ? this.pn(n, this.error) : this.yn(e, this.result) : new t((function(t, i) {
            r.Rn = function(n) {
                r.yn(e, n).next(t, i);
            }, r.An = function(e) {
                r.pn(n, e).next(t, i);
            };
        }));
    }, t.prototype.gn = function() {
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
    }, t.prototype.yn = function(e, n) {
        return e ? this.bn((function() {
            return e(n);
        })) : t.resolve(n);
    }, t.prototype.pn = function(e, n) {
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
}(), Re = /** @class */ function() {
    function t(t, e, n) {
        this.Cn = t, this.Dn = e, this.Fn = n
        /**
     * Get the local view of the document identified by `key`.
     *
     * @return Local view of the document or null if we don't have any cached
     * state for it.
     */;
    }
    return t.prototype.Nn = function(t, e) {
        var n = this;
        return this.Dn.$n(t, e).next((function(r) {
            return n.Ln(t, e, r);
        }));
    }, 
    /** Internal version of `getDocument` that allows reusing batches. */ t.prototype.Ln = function(t, e, n) {
        return this.Cn.kn(t, e).next((function(t) {
            for (var r = 0, i = n; r < i.length; r++) {
                t = i[r].ot(e, t);
            }
            return t;
        }));
    }, 
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    t.prototype.On = function(t, e, n) {
        var r = Ct();
        return e.forEach((function(t, e) {
            for (var i = 0, o = n; i < o.length; i++) {
                e = o[i].ot(t, e);
            }
            r = r.Re(t, e);
        })), r;
    }, 
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */
    t.prototype.qn = function(t, e) {
        var n = this;
        return this.Cn.getEntries(t, e).next((function(e) {
            return n.Mn(t, e);
        }));
    }, 
    /**
     * Similar to `getDocuments`, but creates the local view from the given
     * `baseDocs` without retrieving documents from the local store.
     */
    t.prototype.Mn = function(t, e) {
        var n = this;
        return this.Dn.xn(t, e).next((function(r) {
            var i = n.On(t, e, r), o = Pt();
            return i.forEach((function(t, e) {
                // TODO(http://b/32275378): Don't conflate missing / deleted.
                e || (e = new yt(t, m.min())), o = o.Re(t, e);
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
    t.prototype.Bn = function(t, e, n) {
        return e.qt() ? this.Un(t, e.path) : e.le() ? this.Qn(t, e, n) : this.Wn(t, e, n);
    }, t.prototype.Un = function(t, e) {
        // Just do a simple document lookup.
        return this.Nn(t, new E(e)).next((function(t) {
            var e = Ft();
            return t instanceof dt && (e = e.Re(t.key, t)), e;
        }));
    }, t.prototype.Qn = function(t, e, n) {
        var r = this, i = e.collectionGroup, o = Ft();
        return this.Fn.jn(t, i).next((function(s) {
            return De.forEach(s, (function(s) {
                var u = e.Zt(s.child(i));
                return r.Wn(t, u, n).next((function(t) {
                    t.forEach((function(t, e) {
                        o = o.Re(t, e);
                    }));
                }));
            })).next((function() {
                return o;
            }));
        }));
    }, t.prototype.Wn = function(t, e, n) {
        var r, i, o = this;
        // Query the remote documents and overlay mutations.
                return this.Cn.Bn(t, e, n).next((function(n) {
            return r = n, o.Dn.Gn(t, e);
        })).next((function(e) {
            return i = e, o.Hn(t, i, r).next((function(t) {
                r = t;
                for (var e = 0, n = i; e < n.length; e++) for (var o = n[e], s = 0, u = o.mutations; s < u.length; s++) {
                    var a = u[s], h = a.key, c = r.get(h), f = a.ot(c, c, o.Tn);
                    r = f instanceof dt ? r.Re(h, f) : r.remove(h);
                }
            }));
        })).next((function() {
            // Finally, filter out any documents that don't actually match
            // the query.
            return r.forEach((function(t, n) {
                e.matches(n) || (r = r.remove(t));
            })), r;
        }));
    }, t.prototype.Hn = function(t, e, n) {
        for (var r = zt(), i = 0, o = e; i < o.length; i++) for (var s = 0, u = o[i].mutations; s < u.length; s++) {
            var a = u[s];
            a instanceof it && null === n.get(a.key) && (r = r.add(a.key));
        }
        var h = n;
        return this.Cn.getEntries(t, r).next((function(t) {
            return t.forEach((function(t, e) {
                null !== e && e instanceof dt && (h = h.Re(t, e));
            })), h;
        }));
    }, t;
}(), Ve = /** @class */ function() {
    function t(t, e, n, r) {
        this.targetId = t, this.fromCache = e, this.Kn = n, this.zn = r;
    }
    return t.Yn = function(e, n) {
        for (var r = zt(), i = zt(), o = 0, s = n.docChanges; o < s.length; o++) {
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
}(), ke = /** @class */ function() {
    function t(t, e) {
        var n = this;
        this.previousValue = t, e && (e.Xn = function(t) {
            return n.Jn(t);
        }, this.Zn = function(t) {
            return e.tr(t);
        });
    }
    return t.prototype.Jn = function(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }, t.prototype.next = function() {
        var t = ++this.previousValue;
        return this.Zn && this.Zn(t), t;
    }, t;
}();

/** The default database name for a project. */
/** Represents the database ID a Firestore client is associated with. */ ke.er = -1;

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
var Se = function() {
    var t = this;
    this.promise = new Promise((function(e, n) {
        t.resolve = e, t.reject = n;
    }));
}, Le = /** @class */ function() {
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
        this.sr = t, this.ir = e, this.nr = n, this.rr = r, this.hr = i, this.or = 0, this.ar = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.ur = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    return t.prototype.reset = function() {
        this.or = 0;
    }, 
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */
    t.prototype.cr = function() {
        this.or = this.hr;
    }, 
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */
    t.prototype.lr = function(t) {
        var e = this;
        // Cancel any pending backoff operation.
                this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        var n = Math.floor(this.or + this._r()), r = Math.max(0, Date.now() - this.ur), i = Math.max(0, n - r);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && pe("ExponentialBackoff", "Backing off for " + i + " ms (base delay: " + this.or + " ms, delay with jitter: " + n + " ms, last attempt: " + r + " ms ago)"), 
        this.ar = this.sr.dr(this.ir, i, (function() {
            return e.ur = Date.now(), t();
        })), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.or *= this.rr, this.or < this.nr && (this.or = this.nr), this.or > this.hr && (this.or = this.hr);
    }, t.prototype.cancel = function() {
        null !== this.ar && (this.ar.cancel(), this.ar = null);
    }, 
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */ t.prototype._r = function() {
        return (Math.random() - .5) * this.or;
    }, t;
}(), Me = /** @class */ function() {
    function t(t, e, n, r, i) {
        this.Tr = t, this.ir = e, this.wr = n, this.op = r, this.Er = i, this.mr = new Se, 
        this.then = this.mr.promise.then.bind(this.mr.promise), this.catch = this.mr.promise.catch.bind(this.mr.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.mr.promise.catch((function(t) {}))
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
    return t.Ir = function(e, n, r, i, o) {
        var s = new t(e, n, Date.now() + r, i, o);
        return s.start(r), s;
    }, 
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    t.prototype.start = function(t) {
        var e = this;
        this.Rr = setTimeout((function() {
            return e.Ar();
        }), t);
    }, 
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */
    t.prototype.Pr = function() {
        return this.Ar();
    }, 
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */
    t.prototype.cancel = function(t) {
        null !== this.Rr && (this.clearTimeout(), this.mr.reject(new c(h.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }, t.prototype.Ar = function() {
        var t = this;
        this.Tr.Vr((function() {
            return null !== t.Rr ? (t.clearTimeout(), t.op().then((function(e) {
                return t.mr.resolve(e);
            }))) : Promise.resolve();
        }));
    }, t.prototype.clearTimeout = function() {
        null !== this.Rr && (this.Er(this), clearTimeout(this.Rr), this.Rr = null);
    }, t;
}(), qe = /** @class */ function() {
    function t() {
        var t = this;
        // The last promise in the queue.
                this.pr = Promise.resolve(), 
        // The last retryable operation. Retryable operation are run in order and
        // retried with backoff.
        this.yr = Promise.resolve(), 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.gr = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.br = [], 
        // visible for testing
        this.vr = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.Sr = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Cr = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Dr = new Le(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Fr = function() {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            t.Nr("async_queue_retry" /* AsyncQueueRetry */);
        };
        var e = he.nt().window;
        e && "function" == typeof e.addEventListener && e.addEventListener("visibilitychange", this.Fr);
    }
    return Object.defineProperty(t.prototype, "$r", {
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get: function() {
            return this.gr;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */
    t.prototype.Vr = function(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }, 
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue without waiting for it to complete (i.e. we ignore the Promise result).
     */
    t.prototype.Lr = function(t) {
        this.kr(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Or(t);
    }, 
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue.
     */
    t.prototype.qr = function(t) {
        return this.kr(), this.Or(t);
    }, 
    /**
     * Adds a new operation to the queue and initialize the shut down of this queue.
     * Returns a promise that will be resolved when the promise returned by the new
     * operation is (with its value).
     * Once this method is called, the only possible way to request running an operation
     * is through `enqueueAndForgetEvenAfterShutdown`.
     */
    t.prototype.Mr = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.kr(), this.gr ? [ 3 /*break*/ , 2 ] : (this.gr = !0, (n = he.nt().window) && n.removeEventListener("visibilitychange", this.Fr), 
                    [ 4 /*yield*/ , this.qr(t) ]);

                  case 1:
                    e.sent(), e.label = 2;

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
        return this.kr(), this.gr ? new Promise((function(t) {})) : this.Or(t);
    }, 
    /**
     * Enqueue a retryable operation.
     *
     * A retryable operation is rescheduled with backoff if it fails with a
     * IndexedDbTransactionError (the error type used by SimpleDb). All
     * retryable operations are executed in order and only run if all prior
     * operations were retried successfully.
     */
    t.prototype.xr = function(t) {
        var n = this;
        this.kr(), this.gr || (this.yr = this.yr.then((function() {
            var r = new Se, i = function() {
                return e.__awaiter(n, void 0, void 0, (function() {
                    var n;
                    return e.__generator(this, (function(e) {
                        switch (e.label) {
                          case 0:
                            return e.trys.push([ 0, 2, , 3 ]), [ 4 /*yield*/ , t() ];

                          case 1:
                            return e.sent(), r.resolve(), this.Dr.reset(), [ 3 /*break*/ , 3 ];

                          case 2:
                            if ("IndexedDbTransactionError" !== (n = e.sent()).name) throw r.resolve(), n;
                            // Failure will be handled by AsyncQueue
                                                        return pe("AsyncQueue", "Operation failed with retryable error: " + n), 
                            this.Dr.lr(i), [ 3 /*break*/ , 3 ];

                          case 3:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            };
            return n.Vr(i), r.promise;
        })));
    }, t.prototype.Or = function(t) {
        var e = this, n = this.pr.then((function() {
            return e.Sr = !0, t().catch((function(t) {
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw e.vr = t, e.Sr = !1, de("INTERNAL UNHANDLED ERROR: ", t.stack || t.message || ""), 
                t;
            })).then((function(t) {
                return e.Sr = !1, t;
            }));
        }));
        return this.pr = n, n;
    }, 
    /**
     * Schedules an operation to be queued on the AsyncQueue once the specified
     * `delayMs` has elapsed. The returned CancelablePromise can be used to cancel
     * the operation prior to its running.
     */
    t.prototype.dr = function(t, e, n) {
        var r = this;
        this.kr(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Cr.indexOf(t) > -1 && (e = 0);
        var i = Me.Ir(this, t, e, n, (function(t) {
            return r.Br(t);
        }));
        return this.br.push(i), i;
    }, t.prototype.kr = function() {
        this.vr && ve();
    }, 
    /**
     * Verifies there's an operation currently in-progress on the AsyncQueue.
     * Unfortunately we can't verify that the running code is in the promise chain
     * of that operation, so this isn't a foolproof check, but it should be enough
     * to catch some bugs.
     */
    t.prototype.Ur = function() {}, 
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */
    t.prototype.Qr = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , t = this.pr ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    if (t !== this.pr) return [ 3 /*break*/ , 0 ];
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
    t.prototype.Wr = function(t) {
        for (var e = 0, n = this.br; e < n.length; e++) {
            if (n[e].ir === t) return !0;
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
    t.prototype.Nr = function(t) {
        var e = this;
        // Note that draining may generate more delayed ops, so we do that first.
                return this.Qr().then((function() {
            // Run ops in the same order they'd run if they ran naturally.
            e.br.sort((function(t, e) {
                return t.wr - e.wr;
            }));
            for (var n = 0, r = e.br; n < r.length; n++) {
                var i = r[n];
                if (i.Pr(), "all" /* All */ !== t && i.ir === t) break;
            }
            return e.Qr();
        }));
    }, 
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */
    t.prototype.jr = function(t) {
        this.Cr.push(t);
    }, 
    /** Called once a DelayedOperation is run or canceled. */ t.prototype.Br = function(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        var e = this.br.indexOf(t);
        this.br.splice(e, 1);
    }, t;
}(), Ue = /** @class */ function() {
    function t(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.Gr = t, this.Hr = e, this.Kr = n;
    }
    return t.zr = function(e) {
        return new t(e, t.Yr, t.Xr);
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
 */ Ue.Jr = -1, Ue.Zr = 1048576, Ue.th = 41943040, Ue.Yr = 10, Ue.Xr = 1e3, Ue.eh = new Ue(Ue.th, Ue.Yr, Ue.Xr), 
Ue.DISABLED = new Ue(Ue.Jr, 0, 0);

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
 */
var Oe = /** @class */ function() {
    function t(t) {
        this.sh = t;
    }
    return t.prototype.next = function() {
        return this.sh += 2, this.sh;
    }, t.ih = function() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new t(0);
    }, t.nh = function() {
        // Sync engine assigns target IDs for limbo document detection.
        return new t(-1);
    }, t;
}(), Pe = /** @class */ function() {
    function t() {
        this.rh = new Ce;
    }
    return t.prototype.hh = function(t, e) {
        return this.rh.add(e), De.resolve();
    }, t.prototype.jn = function(t, e) {
        return De.resolve(this.rh.getEntries(e));
    }, t;
}(), Ce = /** @class */ function() {
    function t() {
        this.index = {};
    }
    // Returns false if the entry already existed.
        return t.prototype.add = function(t) {
        var e = t.q(), n = t.k(), r = this.index[e] || new qt(w.N), i = !r.has(n);
        return this.index[e] = r.add(n), i;
    }, t.prototype.has = function(t) {
        var e = t.q(), n = t.k(), r = this.index[e];
        return r && r.has(n);
    }, t.prototype.getEntries = function(t) {
        return (this.index[t] || new qt(w.N)).W();
    }, t;
}(), xe = /** @class */ function() {
    function t(
    /** Manages our in-memory or durable persistence. */
    t, e, n) {
        this.persistence = t, this.oh = e, 
        /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
        this.ah = new St(_e), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.uh = new Ae((function(t) {
            return t.canonicalId();
        })), 
        /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
        this.lh = m.min(), this.Dn = t._h(n), this.fh = t.dh(), this.Th = t.wh(), this.Eh = new Re(this.fh, this.Dn, this.persistence.mh()), 
        this.oh.Ih(this.Eh)
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
    t.prototype.Rh = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return n = this.Dn, r = this.Eh, [ 4 /*yield*/ , this.persistence.runTransaction("Handle user change", "readonly", (function(e) {
                        // Swap out the mutation queue, grabbing the pending mutation batches
                        // before and after.
                        var i;
                        return o.Dn.Ah(e).next((function(s) {
                            return i = s, n = o.persistence._h(t), 
                            // Recreate our LocalDocumentsView using the new
                            // MutationQueue.
                            r = new Re(o.fh, n, o.persistence.mh()), n.Ah(e);
                        })).next((function(t) {
                            for (var n = [], o = [], s = zt(), u = 0, a = i
                            // Union the old/new changed keys.
                            ; u < a.length; u++) {
                                var h = a[u];
                                n.push(h.batchId);
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
                                                        return r.qn(e, s).next((function(t) {
                                return {
                                    Ph: t,
                                    Vh: n,
                                    ph: o
                                };
                            }));
                        }));
                    })) ];

                  case 1:
                    return i = e.sent(), [ 2 /*return*/ , (this.Dn = n, this.Eh = r, this.oh.Ih(this.Eh), 
                    i) ];
                }
            }));
        }));
    }, 
    /* Accept locally generated Mutations and commit them to storage. */ t.prototype.yh = function(t) {
        var e, n = this, r = v.now(), i = t.reduce((function(t, e) {
            return t.add(e.key);
        }), zt());
        return this.persistence.runTransaction("Locally write mutations", "readwrite", (function(o) {
            return n.Eh.qn(o, i).next((function(i) {
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
                    s.push(new it(h.key, c, ct(c.proto.mapValue), et.exists(!0)));
                }
                return n.Dn.gh(o, r, s, t);
            }));
        })).then((function(t) {
            var n = t.En(e);
            return {
                batchId: t.batchId,
                bh: n
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
    t.prototype.vh = function(t) {
        var e = this;
        return this.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (function(n) {
            var r = t.batch.keys(), i = e.fh.Sh({
                Ch: !0
            });
            return e.Dn.vh(n, t.batch, t.streamToken).next((function() {
                return e.Dh(n, t, i);
            })).next((function() {
                return i.apply(n);
            })).next((function() {
                return e.Dn.Fh(n);
            })).next((function() {
                return e.Eh.qn(n, r);
            }));
        }));
    }, 
    /**
     * Remove mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    t.prototype.Nh = function(t) {
        var e = this;
        return this.persistence.runTransaction("Reject batch", "readwrite-primary", (function(n) {
            var r;
            return e.Dn.$h(n, t).next((function(t) {
                return me(null !== t), r = t.keys(), e.Dn.Lh(n, t);
            })).next((function() {
                return e.Dn.Fh(n);
            })).next((function() {
                return e.Eh.qn(n, r);
            }));
        }));
    }, 
    /**
     * Returns the largest (latest) batch id in mutation queue that is pending server response.
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */
    t.prototype.kh = function() {
        var t = this;
        return this.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (function(e) {
            return t.Dn.kh(e);
        }));
    }, 
    /** Returns the last recorded stream token for the current user. */ t.prototype.Oh = function() {
        var t = this;
        return this.persistence.runTransaction("Get last stream token", "readonly", (function(e) {
            return t.Dn.Oh(e);
        }));
    }, 
    /**
     * Sets the stream token for the current user without acknowledging any
     * mutation batch. This is usually only useful after a stream handshake or in
     * response to an error that requires clearing the stream token.
     */
    t.prototype.qh = function(t) {
        var e = this;
        return this.persistence.runTransaction("Set last stream token", "readwrite-primary", (function(n) {
            return e.Dn.qh(n, t);
        }));
    }, 
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    t.prototype.Mh = function() {
        var t = this;
        return this.persistence.runTransaction("Get last remote snapshot version", "readonly", (function(e) {
            return t.Th.Mh(e);
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
    t.prototype.xh = function(e) {
        var n = this, r = e.we, i = this.ah;
        return this.persistence.runTransaction("Apply remote event", "readwrite-primary", (function(o) {
            var s = n.fh.Sh({
                Ch: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                        i = n.ah;
            var u = [];
            e.as.forEach((function(e, s) {
                var a = i.get(s);
                if (a) {
                    // Only update the remote keys if the target is still active. This
                    // ensures that we can persist the updated target data along with
                    // the updated assignment.
                    u.push(n.Th.Bh(o, e.Es, s).next((function() {
                        return n.Th.Uh(o, e.Ts, s);
                    })));
                    var h = e.resumeToken;
                    // Update the resume token if the change includes one.
                                        if (h.rt() > 0) {
                        var c = a.me(h, r).Ee(o.Qh);
                        i = i.Re(s, c), 
                        // Update the target data if there are target changes (or if
                        // sufficient time has passed since the last update).
                        t.Wh(a, c, e) && u.push(n.Th.jh(o, c));
                    }
                }
            }));
            var a = Pt(), h = zt();
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
                                        h instanceof yt && h.version.isEqual(m.min()) ? (
                    // NoDocuments with SnapshotVersion.min() are used in manufactured
                    // events. We remove these documents from cache since we lost
                    // access.
                    s.Gh(i, r), a = a.Re(i, h)) : null == c || h.version.S(c.version) > 0 || 0 === h.version.S(c.version) && c.hasPendingWrites ? (s.Hh(h, r), 
                    a = a.Re(i, h)) : pe("LocalStore", "Ignoring outdated watch update for ", i, ". Current version:", c.version, " Watch version:", h.version), 
                    e.ls.has(i) && u.push(n.persistence.zh.Kh(o, i));
                }));
            }))), !r.isEqual(m.min())) {
                var c = n.Th.Mh(o).next((function(t) {
                    return n.Th.Yh(o, o.Qh, r);
                }));
                u.push(c);
            }
            return De.vn(u).next((function() {
                return s.apply(o);
            })).next((function() {
                return n.Eh.Mn(o, a);
            }));
        })).then((function(t) {
            return n.ah = i, t;
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
    t.Wh = function(t, e, n) {
        // Always persist target data if we don't already have a resume token.
        return me(e.resumeToken.rt() > 0), 0 === t.resumeToken.rt() || (e.we.C() - t.we.C() >= this.Xh || n.Ts.size + n.ws.size + n.Es.size > 0);
        // Don't allow resume token changes to be buffered indefinitely. This
        // allows us to be reasonably up-to-date after a crash and avoids needing
        // to loop over all active queries on shutdown. Especially in the browser
        // we may not get time to do anything interesting while the current tab is
        // closing.
        }, 
    /**
     * Notify local store of the changed views to locally pin documents.
     */
    t.prototype.Jh = function(t) {
        var e = this;
        return this.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (function(n) {
            return De.forEach(t, (function(t) {
                return De.forEach(t.Kn, (function(r) {
                    return e.persistence.zh.Zh(n, t.targetId, r);
                })).next((function() {
                    return De.forEach(t.zn, (function(r) {
                        return e.persistence.zh.to(n, t.targetId, r);
                    }));
                }));
            }));
        })).then((function() {
            for (var n = 0, r = t; n < r.length; n++) {
                var i = r[n], o = i.targetId;
                if (!i.fromCache) {
                    var s = e.ah.get(o), u = s.we, a = s.Ie(u);
                    // Advance the last limbo free snapshot version
                                        e.ah = e.ah.Re(o, a);
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
    t.prototype.eo = function(t) {
        var e = this;
        return this.persistence.runTransaction("Get next mutation batch", "readonly", (function(n) {
            return void 0 === t && (t = -1), e.Dn.so(n, t);
        }));
    }, 
    /**
     * Read the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    t.prototype.io = function(t) {
        var e = this;
        return this.persistence.runTransaction("read document", "readonly", (function(n) {
            return e.Eh.Nn(n, t);
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
    t.prototype.no = function(t) {
        var e = this;
        return this.persistence.runTransaction("Allocate target", "readwrite", (function(n) {
            var r;
            return e.Th.ro(n, t).next((function(i) {
                return i ? (
                // This target has been listened to previously, so reuse the
                // previous targetID.
                // TODO(mcg): freshen last accessed date?
                r = i, De.resolve(r)) : e.Th.ho(n).next((function(i) {
                    return r = new Dt(t, i, 0 /* Listen */ , n.Qh), e.Th.oo(n, r).next((function() {
                        return r;
                    }));
                }));
            }));
        })).then((function(n) {
            return null === e.ah.get(n.targetId) && (e.ah = e.ah.Re(n.targetId, n), e.uh.set(t, n.targetId)), 
            n;
        }));
    }, 
    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    t.prototype.ro = function(t, e) {
        var n = this.uh.get(e);
        return void 0 !== n ? De.resolve(this.ah.get(n)) : this.Th.ro(t, e);
    }, 
    /**
     * Unpin all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    t.prototype.ao = function(t, e) {
        var n = this, r = this.ah.get(t), i = e ? "readwrite" : "readwrite-primary";
        return this.persistence.runTransaction("Release target", i, (function(t) {
            return e ? De.resolve() : n.persistence.zh.removeTarget(t, r);
        })).then((function() {
            n.ah = n.ah.remove(t), n.uh.delete(r.target);
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
    t.prototype.uo = function(t, e) {
        var n = this, r = m.min(), i = zt();
        return this.persistence.runTransaction("Execute query", "readonly", (function(o) {
            return n.ro(o, t.ee()).next((function(t) {
                if (t) return r = t.lastLimboFreeSnapshotVersion, n.Th.co(o, t.targetId).next((function(t) {
                    i = t;
                }));
            })).next((function() {
                return n.oh.Bn(o, t, e ? r : m.min(), e ? i : zt());
            })).next((function(t) {
                return {
                    documents: t,
                    lo: i
                };
            }));
        }));
    }, t.prototype.Dh = function(t, e, n) {
        var r = this, i = e.batch, o = i.keys(), s = De.resolve();
        return o.forEach((function(r) {
            s = s.next((function() {
                return n.kn(t, r);
            })).next((function(t) {
                var o = t, s = e.In.get(r);
                me(null !== s), (!o || o.version.S(s) < 0) && ((o = i.at(r, o, e)) && 
                // We use the commitVersion as the readTime rather than the
                // document's updateTime since the updateTime is not advanced
                // for updates that do not modify the underlying document.
                n.Hh(o, e.mn));
            }));
        })), s.next((function() {
            return r.Dn.Lh(t, i);
        }));
    }, t.prototype._o = function(t) {
        var e = this;
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (function(n) {
            return t.fo(n, e.ah);
        }));
    }, t;
}();

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
 */
/**
 * The maximum time to leave a resume token buffered without writing it out.
 * This value is arbitrary: it's long enough to avoid several writes
 * (possibly indefinitely if updates come more frequently than this) but
 * short enough that restarting after crashing will still have a pretty
 * recent resume token.
 */
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err An error returned by a LocalStore operation.
 * @return A Promise that resolves after we recovered, or the original error.
 */
function Fe(t) {
    return e.__awaiter(this, void 0, void 0, (function() {
        return e.__generator(this, (function(e) {
            if (t.code !== h.FAILED_PRECONDITION || "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab." !== t.message) throw t;
            return pe("LocalStore", "Unexpectedly lost primary lease"), [ 2 /*return*/ ];
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
 */ xe.Xh = 3e8;

var je = /** @class */ function() {
    function t() {
        // A set of outstanding references to a document sorted by key.
        this.do = new qt(Ge.To), 
        // A set of outstanding references to a document sorted by target id.
        this.wo = new qt(Ge.Eo)
        /** Returns true if the reference set contains no references. */;
    }
    return t.prototype.M = function() {
        return this.do.M();
    }, 
    /** Adds a reference to the given document key for the given ID. */ t.prototype.Zh = function(t, e) {
        var n = new Ge(t, e);
        this.do = this.do.add(n), this.wo = this.wo.add(n);
    }, 
    /** Add references to the given document keys for the given ID. */ t.prototype.mo = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.Zh(t, e);
        }));
    }, 
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */
    t.prototype.to = function(t, e) {
        this.Io(new Ge(t, e));
    }, t.prototype.Ro = function(t, e) {
        var n = this;
        t.forEach((function(t) {
            return n.to(t, e);
        }));
    }, 
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */
    t.prototype.Ao = function(t) {
        var e = this, n = E.EMPTY, r = new Ge(n, t), i = new Ge(n, t + 1), o = [];
        return this.wo.Ge([ r, i ], (function(t) {
            e.Io(t), o.push(t.key);
        })), o;
    }, t.prototype.Po = function() {
        var t = this;
        this.do.forEach((function(e) {
            return t.Io(e);
        }));
    }, t.prototype.Io = function(t) {
        this.do = this.do.delete(t), this.wo = this.wo.delete(t);
    }, t.prototype.Vo = function(t) {
        var e = E.EMPTY, n = new Ge(e, t), r = new Ge(e, t + 1), i = zt();
        return this.wo.Ge([ n, r ], (function(t) {
            i = i.add(t.key);
        })), i;
    }, t.prototype.po = function(t) {
        var e = new Ge(t, 0), n = this.do.Ke(e);
        return null !== n && t.isEqual(n.key);
    }, t;
}(), Ge = /** @class */ function() {
    function t(t, e) {
        this.key = t, this.yo = e
        /** Compare by key then by ID */;
    }
    return t.To = function(t, e) {
        return E.N(t.key, e.key) || _e(t.yo, e.yo);
    }, 
    /** Compare by ID then by key */ t.Eo = function(t, e) {
        return _e(t.yo, e.yo) || E.N(t.key, e.key);
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
function Be(t, e) {
    if (0 !== e.length) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() does not support arguments, but was called with " + un(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has the exact number of arguments.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateExactNumberOfArgs('myFunction', arguments, 2);
 */ function ze(t, e, n) {
    if (e.length !== n) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires " + un(n, "argument") + ", but was called with " + un(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has at least the provided number of
 * arguments (but can have many more).
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
 */ function Qe(t, e, n) {
    if (e.length < n) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires at least " + un(n, "argument") + ", but was called with " + un(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has number of arguments between
 * the values provided.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateBetweenNumberOfArgs('myFunction', arguments, 2, 3);
 */ function We(t, e, n, r) {
    if (e.length < n || e.length > r) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires between " + n + " and " + r + " arguments, but was called with " + un(e.length, "argument") + ".");
}

/**
 * Validates the provided argument is an array and has as least the expected
 * number of elements.
 */
/**
 * Validates the provided positional argument has the native JavaScript type
 * using typeof checks.
 */ function Je(t, e, n, r) {
    Ke(t, e, sn(n) + " argument", r);
}

/**
 * Validates the provided argument has the native JavaScript type using
 * typeof checks or is undefined.
 */ function He(t, e, n, r) {
    void 0 !== r && Je(t, e, n, r);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks.
 */ function Xe(t, e, n, r) {
    Ke(t, e, n + " option", r);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks or is undefined.
 */ function Ye(t, e, n, r) {
    void 0 !== r && Xe(t, e, n, r);
}

/**
 * Validates that the provided named option equals one of the expected values.
 */
/**
 * Validates that the provided named option equals one of the expected values or
 * is undefined.
 */
function Ze(t, e, n, r, i) {
    void 0 !== r && function(t, e, n, r, i) {
        for (var o = [], s = 0, u = i; s < u.length; s++) {
            var a = u[s];
            if (a === r) return;
            o.push(tn(a));
        }
        var f = tn(r);
        throw new c(h.INVALID_ARGUMENT, "Invalid value " + f + " provided to function " + t + '() for option "' + n + '". Acceptable values: ' + o.join(", "));
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
/** Helper to validate the type of a provided input. */ function Ke(t, e, n, r) {
    if (!("object" === e ? $e(r) : "non-empty string" === e ? "string" == typeof r && "" !== r : typeof r === e)) {
        var i = tn(r);
        throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires its " + n + " to be of type " + e + ", but it was: " + i);
    }
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */ function $e(t) {
    return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
}

/** Returns a string describing the type / value of the provided input. */ function tn(t) {
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
    return "function" == typeof t ? "a function" : ve();
}

function en(t, e, n) {
    if (void 0 === n) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires a valid " + sn(e) + " argument, but it was undefined.");
}

/**
 * Validates the provided positional argument is an object, and its keys and
 * values match the expected keys and types provided in optionTypes.
 */ function nn(t, e, n) {
    A(e, (function(e, r) {
        if (n.indexOf(e) < 0) throw new c(h.INVALID_ARGUMENT, "Unknown option '" + e + "' passed to function " + t + "(). Available options: " + n.join(", "));
    }));
}

/**
 * Helper method to throw an error that the provided argument did not pass
 * an instanceof check.
 */ function rn(t, e, n, r) {
    var i = tn(r);
    return new c(h.INVALID_ARGUMENT, "Function " + t + "() requires its " + sn(n) + " argument to be a " + e + ", but it was: " + i);
}

function on(t, e, n) {
    if (n <= 0) throw new c(h.INVALID_ARGUMENT, 'Function "' + t + '()" requires its ' + sn(e) + " argument to be a positive number, but it was: " + n + ".");
}

/** Converts a number to its english word representation */ function sn(t) {
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
 */ function un(t, e) {
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
/** Helper function to assert Uint8Array is available at runtime. */ function an() {
    if ("undefined" == typeof Uint8Array) throw new c(h.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function hn() {
    if (!he.nt().bo) throw new c(h.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}

/**
 * Immutable class holding a blob (binary data).
 * This class is directly exposed in the public API.
 *
 * Note that while you can't hide the constructor in JavaScript code, we are
 * using the hack above to make sure no-one outside this module can call it.
 */ var cn = /** @class */ function() {
    function t(t) {
        hn(), this.vo = t;
    }
    return t.fromBase64String = function(e) {
        ze("Blob.fromBase64String", arguments, 1), Je("Blob.fromBase64String", "string", 1, e), 
        hn();
        try {
            return new t(N.fromBase64String(e));
        } catch (e) {
            throw new c(h.INVALID_ARGUMENT, "Failed to construct Blob from Base64 string: " + e);
        }
    }, t.fromUint8Array = function(e) {
        if (ze("Blob.fromUint8Array", arguments, 1), an(), !(e instanceof Uint8Array)) throw rn("Blob.fromUint8Array", "Uint8Array", 1, e);
        return new t(N.fromUint8Array(e));
    }, t.prototype.toBase64 = function() {
        return ze("Blob.toBase64", arguments, 0), hn(), this.vo.toBase64();
    }, t.prototype.toUint8Array = function() {
        return ze("Blob.toUint8Array", arguments, 0), an(), this.vo.toUint8Array();
    }, t.prototype.toString = function() {
        return "Blob(base64: " + this.toBase64() + ")";
    }, t.prototype.isEqual = function(t) {
        return this.vo.isEqual(t.vo);
    }, t;
}(), fn = /** @class */ function() {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    function t() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        !function(t, e, n, r) {
            if (!(e instanceof Array) || e.length < 1) throw new c(h.INVALID_ARGUMENT, "Function FieldPath() requires its fieldNames argument to be an array with at least " + un(1, "element") + ".");
        }(0, t);
        for (var n = 0; n < t.length; ++n) if (Je("FieldPath", "string", n, t[n]), 0 === t[n].length) throw new c(h.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this.So = new b(t);
    }
    return t.documentId = function() {
        return t.Co;
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw rn("isEqual", "FieldPath", 1, e);
        return this.So.isEqual(e.So);
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
fn.Co = new fn(b.X().j());

/**
 * Matches any characters in a field path string that are reserved.
 */
var ln = new RegExp("[~\\*/\\[\\]]"), pn = function(t) {
    this.Do = t;
}, dn = /** @class */ function(t) {
    function n() {
        return t.call(this, "FieldValue.delete") || this;
    }
    return e.__extends(n, t), n.prototype.Ci = function(t) {
        if (2 /* MergeSet */ !== t.Fo) throw 1 /* Update */ === t.Fo ? t.No("FieldValue.delete() can only appear at the top level of your update data") : t.No("FieldValue.delete() cannot be used with set() unless you pass {merge:true}");
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
                return t.Vt.push(t.path), null;
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(pn), yn = /** @class */ function(t) {
    function n() {
        return t.call(this, "FieldValue.serverTimestamp") || this;
    }
    return e.__extends(n, t), n.prototype.Ci = function(t) {
        return new $(t.path, J.instance);
    }, n.prototype.isEqual = function(t) {
        return t instanceof n;
    }, n;
}(pn), vn = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this, "FieldValue.arrayUnion") || this).$o = e, n;
    }
    return e.__extends(n, t), n.prototype.Ci = function(t) {
        // Although array transforms are used with writes, the actual elements
        // being uniomed or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        var e = new An({
            Fo: 3 /* Argument */ ,
            methodName: this.Do,
            Lo: !0
        }, t.ii, t.serializer), n = this.$o.map((function(t) {
            return Nn(t, e);
        })), r = new H(n);
        return new $(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(pn), mn = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this, "FieldValue.arrayRemove") || this).$o = e, n;
    }
    return e.__extends(n, t), n.prototype.Ci = function(t) {
        // Although array transforms are used with writes, the actual elements
        // being unioned or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        var e = new An({
            Fo: 3 /* Argument */ ,
            methodName: this.Do,
            Lo: !0
        }, t.ii, t.serializer), n = this.$o.map((function(t) {
            return Nn(t, e);
        })), r = new X(n);
        return new $(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(pn), gn = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this, "FieldValue.increment") || this).ko = e, n;
    }
    return e.__extends(n, t), n.prototype.Ci = function(t) {
        var e = new An({
            Fo: 3 /* Argument */ ,
            methodName: this.Do
        }, t.ii, t.serializer), n = Nn(this.ko, e), r = new Y(t.serializer, n);
        return new $(t.path, r);
    }, n.prototype.isEqual = function(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }, n;
}(pn), wn = /** @class */ function() {
    function t(t, e) {
        if (ze("GeoPoint", arguments, 2), Je("GeoPoint", "number", 1, t), Je("GeoPoint", "number", 2, e), 
        !isFinite(t) || t < -90 || t > 90) throw new c(h.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new c(h.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this.Oo = t, this.qo = e;
    }
    return Object.defineProperty(t.prototype, "latitude", {
        /**
         * Returns the latitude of this geo point, a number between -90 and 90.
         */
        get: function() {
            return this.Oo;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "longitude", {
        /**
         * Returns the longitude of this geo point, a number between -180 and 180.
         */
        get: function() {
            return this.qo;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(t) {
        return this.Oo === t.Oo && this.qo === t.qo;
    }, 
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */
    t.prototype.g = function(t) {
        return _e(this.Oo, t.Oo) || _e(this.qo, t.qo);
    }, t;
}(), _n = /^__.*__$/, bn = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.Vt = e, this.fieldTransforms = n;
    }
    return t.prototype.Mo = function(t, e) {
        var n = [];
        return null !== this.Vt ? n.push(new it(t, this.data, this.Vt, e)) : n.push(new rt(t, this.data, e)), 
        this.fieldTransforms.length > 0 && n.push(new ot(t, this.fieldTransforms)), n;
    }, t;
}(), En = /** @class */ function() {
    function t(t, e, n) {
        this.data = t, this.Vt = e, this.fieldTransforms = n;
    }
    return t.prototype.Mo = function(t, e) {
        var n = [ new it(t, this.data, this.Vt, e) ];
        return this.fieldTransforms.length > 0 && n.push(new ot(t, this.fieldTransforms)), 
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
 */ function Tn(t) {
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
        throw ve();
    }
}

/** A "context" object passed around while parsing user data. */ var An = /** @class */ function() {
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
        void 0 === r && this.xo(), this.fieldTransforms = r || [], this.Vt = i || [];
    }
    return Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.settings.path;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "Fo", {
        get: function() {
            return this.settings.Fo;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Returns a new context with the specified settings overwritten. */ t.prototype.Bo = function(e) {
        return new t(Object.assign(Object.assign({}, this.settings), e), this.ii, this.serializer, this.fieldTransforms, this.Vt);
    }, t.prototype.Uo = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.Bo({
            path: n,
            Lo: !1
        });
        return r.Qo(t), r;
    }, t.prototype.Wo = function(t) {
        var e, n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), r = this.Bo({
            path: n,
            Lo: !1
        });
        return r.xo(), r;
    }, t.prototype.jo = function(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.Bo({
            path: void 0,
            Lo: !0
        });
    }, t.prototype.No = function(t) {
        var e = !this.path || this.path.M() ? "" : " (found in field " + this.path.toString() + ")";
        return new c(h.INVALID_ARGUMENT, "Function " + this.settings.methodName + "() called with invalid data. " + t + e);
    }, 
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */ t.prototype.contains = function(t) {
        return void 0 !== this.Vt.find((function(e) {
            return t.B(e);
        })) || void 0 !== this.fieldTransforms.find((function(e) {
            return t.B(e.field);
        }));
    }, t.prototype.xo = function() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (var t = 0; t < this.path.length; t++) this.Qo(this.path.get(t));
    }, t.prototype.Qo = function(t) {
        if (0 === t.length) throw this.No("Document fields must not be empty");
        if (Tn(this.Fo) && _n.test(t)) throw this.No('Document fields cannot begin and end with "__"');
    }, t;
}(), In = /** @class */ function() {
    function t(t, e) {
        this.ii = t, this.serializer = e || he.nt().Go(t)
        /** Parse document data from a non-merge set() call. */;
    }
    return t.prototype.Ho = function(t, e) {
        var n = this.Ko(0 /* Set */ , t);
        Vn("Data must be an object, but it was:", n, e);
        var r = Dn(e, n);
        return new bn(new at(r), 
        /* fieldMask= */ null, n.fieldTransforms);
    }, 
    /** Parse document data from a set() call with '{merge:true}'. */ t.prototype.zo = function(t, e, n) {
        var r = this.Ko(2 /* MergeSet */ , t);
        Vn("Data must be an object, but it was:", r, e);
        var i, o, s = Dn(e, r);
        if (n) {
            for (var u = [], a = 0, f = n; a < f.length; a++) {
                var l = f[a], p = void 0;
                if (l instanceof fn) p = l.So; else {
                    if ("string" != typeof l) throw ve();
                    p = Sn(t, l);
                }
                if (!r.contains(p)) throw new c(h.INVALID_ARGUMENT, "Field '" + p + "' is specified in your field mask but missing from your input data.");
                Ln(u, p) || u.push(p);
            }
            i = new K(u), o = r.fieldTransforms.filter((function(t) {
                return i.ft(t.field);
            }));
        } else i = new K(r.Vt), o = r.fieldTransforms;
        return new bn(new at(s), i, o);
    }, 
    /** Parse update data from an update() call. */ t.prototype.Yo = function(t, e) {
        var n = this.Ko(1 /* Update */ , t);
        Vn("Data must be an object, but it was:", n, e);
        var r = [], i = new ht;
        A(e, (function(e, o) {
            var s = Sn(t, e), u = n.Wo(s);
            if (o instanceof dn) 
            // Add it to the field mask, but don't add anything to updateData.
            r.push(s); else {
                var a = Nn(o, u);
                null != a && (r.push(s), i.set(s, a));
            }
        }));
        var o = new K(r);
        return new En(i.gt(), o, n.fieldTransforms);
    }, 
    /** Parse update data from a list of field/value arguments. */ t.prototype.Xo = function(t, e, n, r) {
        var i = this.Ko(1 /* Update */ , t), o = [ kn(t, e) ], s = [ n ];
        if (r.length % 2 != 0) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() needs to be called with an even number of arguments that alternate between field names and values.");
        for (var u = 0; u < r.length; u += 2) o.push(kn(t, r[u])), s.push(r[u + 1]);
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (var a = [], f = new ht, l = o.length - 1; l >= 0; --l) if (!Ln(a, o[l])) {
            var p = o[l], d = s[l], y = i.Wo(p);
            if (d instanceof dn) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(p); else {
                var v = Nn(d, y);
                null != v && (a.push(p), f.set(p, v));
            }
        }
        var m = new K(a);
        return new En(f.gt(), m, i.fieldTransforms);
    }, 
    /** Creates a new top-level parse context. */ t.prototype.Ko = function(t, e) {
        return new An({
            Fo: t,
            methodName: e,
            path: b.H,
            Lo: !1
        }, this.ii, this.serializer);
    }, 
    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */
    t.prototype.Jo = function(t, e, n) {
        return void 0 === n && (n = !1), Nn(e, this.Ko(n ? 4 /* ArrayArgument */ : 3 /* Argument */ , t));
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
function Nn(t, e) {
    if (Rn(t)) return Vn("Unsupported field value:", e, t), Dn(t, e);
    if (t instanceof pn) 
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
        if (!Tn(e.Fo)) throw e.No(t.Do + "() can only be used with update() and set()");
        if (null === e.path) throw e.No(t.Do + "() is not currently supported inside arrays");
        var n = t.Ci(e);
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
        if (e.settings.Lo && 4 /* ArrayArgument */ !== e.Fo) throw e.No("Nested arrays are not supported");
        return function(t, e) {
            for (var n = [], r = 0, i = 0, o = t; i < o.length; i++) {
                var s = Nn(o[i], e.jo(r));
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
            var n = v.fromDate(t);
            return {
                timestampValue: e.serializer.D(n)
            };
        }
        if (t instanceof v) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            var r = new v(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: e.serializer.D(r)
            };
        }
        if (t instanceof wn) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof cn) return {
            bytesValue: e.serializer.ui(t)
        };
        if (t instanceof yr) {
            var i = e.ii, o = t.firestore.Zo;
            if (!o.isEqual(i)) throw e.No("Document reference is for database " + o.projectId + "/" + o.database + " but should be for database " + i.projectId + "/" + i.database);
            return {
                referenceValue: e.serializer.li(t.ta.path, t.firestore.Zo)
            };
        }
        throw e.No("Unsupported field value: " + tn(t));
    }(t, e);
}

function Dn(t, e) {
    var n = {};
    return I(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.Vt.push(e.path) : A(t, (function(t, r) {
        var i = Nn(r, e.Uo(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function Rn(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof v || t instanceof wn || t instanceof cn || t instanceof yr || t instanceof pn);
}

function Vn(t, e, n) {
    if (!Rn(n) || !$e(n)) {
        var r = tn(n);
        throw "an object" === r ? e.No(t + " a custom object") : e.No(t + " " + r);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function kn(t, e) {
    if (e instanceof fn) return e.So;
    if ("string" == typeof e) return Sn(t, e);
    throw new c(h.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. Field path arguments must be of type string or FieldPath.");
}

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName The publicly visible method name
 * @param path The dot-separated string form of a field path which will be split
 * on dots.
 */ function Sn(t, n) {
    try {
        return function(t) {
            if (t.search(ln) >= 0) throw new c(h.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not contain '~', '*', '/', '[', or ']'");
            try {
                return new (fn.bind.apply(fn, e.__spreadArrays([ void 0 ], t.split("."))));
            } catch (e) {
                throw new c(h.INVALID_ARGUMENT, "Invalid field path (" + t + "). Paths must not be empty, begin with '.', end with '.', or contain '..'");
            }
        }(n).So;
    } catch (n) {
        var r = (i = n) instanceof Error ? i.message : i.toString();
        throw new c(h.INVALID_ARGUMENT, "Function " + t + "() called with invalid data. " + r);
    }
    /**
 * Extracts the message from a caught exception, which should be an Error object
 * though JS doesn't guarantee that.
 */    var i;
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

function Ln(t, e) {
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
 */ var Mn = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.sr = t, this.ea = n, this.sa = r, this.ia = i, this.listener = o, this.state = 0 /* Initial */ , 
        /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
        this.na = 0, this.ra = null, this.stream = null, this.Dr = new Le(t, e)
        /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */;
    }
    return t.prototype.ha = function() {
        return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
    }, 
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */
    t.prototype.oa = function() {
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
        3 /* Error */ !== this.state ? this.auth() : this.aa();
    }, 
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */
    t.prototype.stop = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.ha() ? [ 4 /*yield*/ , this.close(0 /* Initial */) ] : [ 3 /*break*/ , 2 ];

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
    t.prototype.ua = function() {
        this.state = 0 /* Initial */ , this.Dr.reset();
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
    t.prototype.ca = function() {
        var t = this;
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
                this.oa() && null === this.ra && (this.ra = this.sr.dr(this.ea, 6e4, (function() {
            return t.la();
        })));
    }, 
    /** Sends a message to the underlying stream. */ t.prototype._a = function(t) {
        this.fa(), this.stream.send(t);
    }, 
    /** Called by the idle timer when the stream should close due to inactivity. */ t.prototype.la = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                return this.oa() ? [ 2 /*return*/ , this.close(0 /* Initial */) ] : [ 2 /*return*/ ];
            }));
        }));
    }, 
    /** Marks the stream as active again. */ t.prototype.fa = function() {
        this.ra && (this.ra.cancel(), this.ra = null);
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
    t.prototype.close = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Notify the listener that the stream closed.
                    // Cancel any outstanding timers (they're guaranteed not to execute).
                    return this.fa(), this.Dr.cancel(), 
                    // Invalidates any stream-related callbacks (e.g. from auth or the
                    // underlying stream), guaranteeing they won't execute.
                    this.na++, 3 /* Error */ !== t ? 
                    // If this is an intentional close ensure we don't delay our next connection attempt.
                    this.Dr.reset() : n && n.code === h.RESOURCE_EXHAUSTED ? (
                    // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
                    de(n.toString()), de("Using maximum backoff delay to prevent overloading the backend."), 
                    this.Dr.cr()) : n && n.code === h.UNAUTHENTICATED && 
                    // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
                    // just expired.
                    this.ia.l(), 
                    // Clean up the underlying stream because we are no longer interested in events.
                    null !== this.stream && (this.da(), this.stream.close(), this.stream = null), 
                    // This state must be assigned before calling onClose() to allow the callback to
                    // inhibit backoff or otherwise manipulate the state in its non-started state.
                    this.state = t, [ 4 /*yield*/ , this.listener.Ta(n) ];

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
    t.prototype.da = function() {}, t.prototype.auth = function() {
        var t = this;
        this.state = 1 /* Starting */;
        var e = this.wa(this.na), n = this.na;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                this.ia.getToken().then((function(e) {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            t.na === n && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            t.Ea(e);
        }), (function(n) {
            e((function() {
                var e = new c(h.UNKNOWN, "Fetching auth token failed: " + n.message);
                return t.ma(e);
            }));
        }));
    }, t.prototype.Ea = function(t) {
        var e = this, n = this.wa(this.na);
        this.stream = this.Ia(t), this.stream.Ra((function() {
            n((function() {
                return e.state = 2 /* Open */ , e.listener.Ra();
            }));
        })), this.stream.Ta((function(t) {
            n((function() {
                return e.ma(t);
            }));
        })), this.stream.onMessage((function(t) {
            n((function() {
                return e.onMessage(t);
            }));
        }));
    }, t.prototype.aa = function() {
        var t = this;
        this.state = 4 /* Backoff */ , this.Dr.lr((function() {
            return e.__awaiter(t, void 0, void 0, (function() {
                return e.__generator(this, (function(t) {
                    return this.state = 0 /* Initial */ , this.start(), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, 
    // Visible for tests
    t.prototype.ma = function(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return pe("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
    }, 
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */
    t.prototype.wa = function(t) {
        var e = this;
        return function(n) {
            e.sr.Vr((function() {
                return e.na === t ? n() : (pe("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve());
            }));
        };
    }, t;
}(), qn = /** @class */ function(t) {
    function n(e, n, r, i, o) {
        var s = this;
        return (s = t.call(this, e, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , n, r, o) || this).serializer = i, 
        s;
    }
    return e.__extends(n, t), n.prototype.Ia = function(t) {
        return this.sa.Aa("Listen", t);
    }, n.prototype.onMessage = function(t) {
        // A successful response means the stream is healthy
        this.Dr.reset();
        var e = this.serializer.yi(t), n = this.serializer.bi(t);
        return this.listener.Pa(e, n);
    }, 
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */
    n.prototype.Va = function(t) {
        var e = {};
        e.database = this.serializer.mi, e.addTarget = this.serializer.ee(t);
        var n = this.serializer.Ki(t);
        n && (e.labels = n), this._a(e);
    }, 
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */
    n.prototype.pa = function(t) {
        var e = {};
        e.database = this.serializer.mi, e.removeTarget = t, this._a(e);
    }, n;
}(Mn), Un = /** @class */ function(t) {
    function n(e, n, r, i, o) {
        var s = this;
        return (s = t.call(this, e, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , n, r, o) || this).serializer = i, 
        s.ya = !1, 
        /**
             * The last received stream token from the server, used to acknowledge which
             * responses the client has processed. Stream tokens are opaque checkpoint
             * markers whose only real value is their inclusion in the next request.
             *
             * PersistentWriteStream manages propagating this value from responses to the
             * next request.
             */
        s.lastStreamToken = N.ht, s;
    }
    return e.__extends(n, t), Object.defineProperty(n.prototype, "ga", {
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */
        get: function() {
            return this.ya;
        },
        enumerable: !0,
        configurable: !0
    }), 
    // Override of PersistentStream.start
    n.prototype.start = function() {
        this.ya = !1, t.prototype.start.call(this);
    }, n.prototype.da = function() {
        this.ya && this.ba([]);
    }, n.prototype.Ia = function(t) {
        return this.sa.Aa("Write", t);
    }, n.prototype.onMessage = function(t) {
        if (
        // Always capture the last stream token.
        me(!!t.streamToken), this.lastStreamToken = this.serializer.ci(t.streamToken), this.ya) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Dr.reset();
            var e = this.serializer.Oi(t.writeResults, t.commitTime), n = this.serializer.fromVersion(t.commitTime);
            return this.listener.va(n, e);
        }
        // The first response is always the handshake response
                return me(!t.writeResults || 0 === t.writeResults.length), this.ya = !0, 
        this.listener.Sa();
    }, 
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */
    n.prototype.Ca = function() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        var t = {};
        t.database = this.serializer.mi, this._a(t);
    }, 
    /** Sends a group of mutations to the Firestore backend to apply. */ n.prototype.ba = function(t) {
        var e = this, n = {
            streamToken: this.serializer.ui(this.lastStreamToken),
            writes: t.map((function(t) {
                return e.serializer.vi(t);
            }))
        };
        this._a(n);
    }, n;
}(Mn), On = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        return (i = t.call(this) || this).sa = e, i.credentials = n, i.serializer = r, i;
    }
    /** Gets an auth token and invokes the provided RPC. */    return e.__extends(n, t), 
    n.prototype.Fa = function(t, e) {
        var n = this;
        return this.credentials.getToken().then((function(r) {
            return n.sa.Fa(t, e, r);
        })).catch((function(t) {
            throw t.code === h.UNAUTHENTICATED && n.credentials.l(), t;
        }));
    }, 
    /** Gets an auth token and invokes the provided RPC with streamed results. */ n.prototype.Na = function(t, e) {
        var n = this;
        return this.credentials.getToken().then((function(r) {
            return n.sa.Na(t, e, r);
        })).catch((function(t) {
            throw t.code === h.UNAUTHENTICATED && n.credentials.l(), t;
        }));
    }, n;
}((function() {
    // Make sure that the structural type of `Datastore` is unique.
    // See https://github.com/microsoft/TypeScript/issues/5451
    this.Da = void 0;
})), Pn = /** @class */ function() {
    function t(t) {
        this.$a = t, 
        // The version of each document that was read during this transaction.
        this.La = Gt(), this.mutations = [], this.ka = !1, 
        /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
        this.Oa = null, 
        /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
        this.qa = new Set;
    }
    return t.prototype.Ma = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r = this;
            return e.__generator(this, (function(i) {
                switch (i.label) {
                  case 0:
                    if (this.xa(), this.mutations.length > 0) throw new c(h.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
                    return [ 4 /*yield*/ , function(t, n) {
                        return e.__awaiter(this, void 0, void 0, (function() {
                            var r, i, o, s, u;
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return r = ge(t), i = {
                                        database: r.serializer.mi,
                                        documents: n.map((function(t) {
                                            return r.serializer.di(t);
                                        }))
                                    }, [ 4 /*yield*/ , r.Na("BatchGetDocuments", i) ];

                                  case 1:
                                    return o = e.sent(), s = new Map, o.forEach((function(t) {
                                        var e = r.serializer.pi(t);
                                        s.set(e.key.toString(), e);
                                    })), u = [], [ 2 /*return*/ , (n.forEach((function(t) {
                                        var e = s.get(t.toString());
                                        me(!!e), u.push(e);
                                    })), u) ];
                                }
                            }));
                        }));
                    }(this.$a, t) ];

                  case 1:
                    return [ 2 /*return*/ , ((n = i.sent()).forEach((function(t) {
                        t instanceof yt || t instanceof dt ? r.Ba(t) : ve();
                    })), n) ];
                }
            }));
        }));
    }, t.prototype.set = function(t, e) {
        this.write(e.Mo(t, this.Rt(t))), this.qa.add(t);
    }, t.prototype.update = function(t, e) {
        try {
            this.write(e.Mo(t, this.Ua(t)));
        } catch (t) {
            this.Oa = t;
        }
        this.qa.add(t);
    }, t.prototype.delete = function(t) {
        this.write([ new st(t, this.Rt(t)) ]), this.qa.add(t);
    }, t.prototype.commit = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n = this;
            return e.__generator(this, (function(r) {
                switch (r.label) {
                  case 0:
                    if (this.xa(), this.Oa) throw this.Oa;
                    return t = this.La, 
                    // For each mutation, note that the doc was written.
                    this.mutations.forEach((function(e) {
                        t = t.remove(e.key);
                    })), 
                    // For each document that was read but not written to, we want to perform
                    // a `verify` operation.
                    t.forEach((function(t, e) {
                        n.mutations.push(new ut(t, n.Rt(t)));
                    })), [ 4 /*yield*/ , function(t, n) {
                        return e.__awaiter(this, void 0, void 0, (function() {
                            var r, i, o;
                            return e.__generator(this, (function(e) {
                                switch (e.label) {
                                  case 0:
                                    return r = ge(t), i = {
                                        database: r.serializer.mi,
                                        writes: n.map((function(t) {
                                            return r.serializer.vi(t);
                                        }))
                                    }, [ 4 /*yield*/ , r.Fa("Commit", i) ];

                                  case 1:
                                    return o = e.sent(), [ 2 /*return*/ , r.serializer.Oi(o.writeResults, o.commitTime) ];
                                }
                            }));
                        }));
                    }(this.$a, this.mutations) ];

                  case 1:
                    // For each mutation, note that the doc was written.
                    return r.sent(), this.ka = !0, [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Ba = function(t) {
        var e;
        if (t instanceof dt) e = t.version; else {
            if (!(t instanceof yt)) throw ve();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
                        e = m.min();
        }
        var n = this.La.get(t.key);
        if (null !== n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new c(h.ABORTED, "Document version changed between two reads.");
        } else this.La = this.La.Re(t.key, e);
    }, 
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */
    t.prototype.Rt = function(t) {
        var e = this.La.get(t);
        return !this.qa.has(t) && e ? et.updateTime(e) : et.dt();
    }, 
    /**
     * Returns the precondition for a document if the operation is an update.
     */
    t.prototype.Ua = function(t) {
        var e = this.La.get(t);
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.qa.has(t) && e) {
            if (e.isEqual(m.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new c(h.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return et.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
                return et.exists(!0);
    }, t.prototype.write = function(t) {
        this.xa(), this.mutations = this.mutations.concat(t);
    }, t.prototype.xa = function() {}, t;
}(), Cn = /** @class */ function() {
    function t(t, e) {
        this.Tr = t, this.Qa = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
        this.Wa = 0, 
        /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
        this.ja = null, 
        /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
        this.Ga = !0
        /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */;
    }
    return t.prototype.Ha = function() {
        var t = this;
        0 === this.Wa && (this.Ka("Unknown" /* Unknown */), this.ja = this.Tr.dr("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (function() {
            return t.ja = null, t.za("Backend didn't respond within 10 seconds."), t.Ka("Offline" /* Offline */), 
            Promise.resolve();
        })));
    }, 
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */
    t.prototype.Ya = function(t) {
        "Online" /* Online */ === this.state ? this.Ka("Unknown" /* Unknown */) : (this.Wa++, 
        this.Wa >= 1 && (this.Xa(), this.za("Connection failed 1 times. Most recent error: " + t.toString()), 
        this.Ka("Offline" /* Offline */)));
    }, 
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */
    t.prototype.set = function(t) {
        this.Xa(), this.Wa = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.Ga = !1), this.Ka(t);
    }, t.prototype.Ka = function(t) {
        t !== this.state && (this.state = t, this.Qa(t));
    }, t.prototype.za = function(t) {
        var e = "Could not reach Cloud Firestore backend. " + t + "\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.Ga ? (de(e), this.Ga = !1) : pe("OnlineStateTracker", e);
    }, t.prototype.Xa = function() {
        null !== this.ja && (this.ja.cancel(), this.ja = null);
    }, t;
}(), xn = /** @class */ function() {
    function t(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    t, 
    /** The client-side proxy for interacting with the backend. */
    n, r, i, o) {
        var s = this;
        this.Ja = t, this.$a = n, this.Tr = r, 
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
        this.Za = [], 
        /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
        this.tu = new Map, this.eu = null, 
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
        this.su = !1, this.iu = o, this.iu.nu((function(t) {
            r.Vr((function() {
                return e.__awaiter(s, void 0, void 0, (function() {
                    return e.__generator(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            return this.ru() ? (pe("RemoteStore", "Restarting streams for network reachability change."), 
                            [ 4 /*yield*/ , this.hu() ]) : [ 3 /*break*/ , 2 ];

                          case 1:
                            t.sent(), t.label = 2;

                          case 2:
                            return [ 2 /*return*/ ];
                        }
                    }));
                }));
            }));
        })), this.ou = new Cn(r, i), 
        // Create streams (but note they're not started yet).
        this.au = function(t, e, n) {
            var r = ge(t);
            return new qn(e, r.sa, r.credentials, r.serializer, n);
        }(this.$a, r, {
            Ra: this.uu.bind(this),
            Ta: this.cu.bind(this),
            Pa: this.lu.bind(this)
        }), this._u = function(t, e, n) {
            var r = ge(t);
            return new Un(e, r.sa, r.credentials, r.serializer, n);
        }(this.$a, r, {
            Ra: this.fu.bind(this),
            Ta: this.du.bind(this),
            Sa: this.Tu.bind(this),
            va: this.va.bind(this)
        });
    }
    /**
     * Starts up the remote store, creating streams, restoring state from
     * LocalStore, etc.
     */    return t.prototype.start = function() {
        return this.enableNetwork();
    }, 
    /** Re-enables the network. Idempotent. */ t.prototype.enableNetwork = function() {
        return this.networkEnabled = !0, this.wu();
    }, t.prototype.wu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.ru() ? (t = this._u, [ 4 /*yield*/ , this.Ja.Oh() ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    // This will start the write stream if necessary.
                    return t.lastStreamToken = e.sent(), this.Eu() ? this.mu() : this.ou.set("Unknown" /* Unknown */), 
                    [ 4 /*yield*/ , this.Iu() ];

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
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.networkEnabled = !1, [ 4 /*yield*/ , this.Ru() ];

                  case 1:
                    return t.sent(), 
                    // Set the OnlineState to Offline so get()s return from cache, etc.
                    this.ou.set("Offline" /* Offline */), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Ru = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return [ 4 /*yield*/ , this._u.stop() ];

                  case 1:
                    return t.sent(), [ 4 /*yield*/ , this.au.stop() ];

                  case 2:
                    return t.sent(), this.Za.length > 0 && (pe("RemoteStore", "Stopping write stream with " + this.Za.length + " pending writes"), 
                    this.Za = []), this.Au(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Pu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return pe("RemoteStore", "RemoteStore shutting down."), this.networkEnabled = !1, 
                    [ 4 /*yield*/ , this.Ru() ];

                  case 1:
                    return t.sent(), this.iu.Pu(), 
                    // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                    // triggering spurious listener events with cached data, etc.
                    this.ou.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */
    t.prototype.listen = function(t) {
        this.tu.has(t.targetId) || (
        // Mark this as something the client is currently listening for.
        this.tu.set(t.targetId, t), this.Eu() ? 
        // The listen will be sent in onWatchStreamOpen
        this.mu() : this.au.oa() && this.Vu(t));
    }, 
    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */
    t.prototype.pu = function(t) {
        this.tu.delete(t), this.au.oa() && this.yu(t), 0 === this.tu.size && (this.au.oa() ? this.au.ca() : this.ru() && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        this.ou.set("Unknown" /* Unknown */));
    }, 
    /** {@link TargetMetadataProvider.getTargetDataForTarget} */ t.prototype.si = function(t) {
        return this.tu.get(t) || null;
    }, 
    /** {@link TargetMetadataProvider.getRemoteKeysForTarget} */ t.prototype.ei = function(t) {
        return this.gu.ei(t);
    }, 
    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */
    t.prototype.Vu = function(t) {
        this.eu.Ns(t.targetId), this.au.Va(t);
    }, 
    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */
    t.prototype.yu = function(t) {
        this.eu.Ns(t), this.au.pa(t);
    }, t.prototype.mu = function() {
        this.eu = new ne(this), this.au.start(), this.ou.Ha();
    }, 
    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */
    t.prototype.Eu = function() {
        return this.ru() && !this.au.ha() && this.tu.size > 0;
    }, t.prototype.ru = function() {
        return !this.su && this.isPrimary && this.networkEnabled;
    }, t.prototype.Au = function() {
        this.eu = null;
    }, t.prototype.uu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t = this;
            return e.__generator(this, (function(e) {
                return this.tu.forEach((function(e, n) {
                    t.Vu(e);
                })), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.cu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                return this.Au(), 
                // If we still need the watch stream, retry the connection.
                this.Eu() ? (this.ou.Ya(t), this.mu()) : 
                // No need to restart watch stream because there are no active targets.
                // The online state is set to unknown because there is no active attempt
                // at establishing a connection
                this.ou.set("Unknown" /* Unknown */), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.lu = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    if (this.ou.set("Online" /* Online */), !(t instanceof te && 2 /* Removed */ === t.state && t.cause)) 
                    // Mark the client as online since we got a message from the server
                    return [ 3 /*break*/ , 6 ];
                    e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 3, , 5 ]), [ 4 /*yield*/ , this.bu(t) ];

                  case 2:
                    return e.sent(), [ 3 /*break*/ , 5 ];

                  case 3:
                    return r = e.sent(), pe("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), r), 
                    [ 4 /*yield*/ , this.vu(r) ];

                  case 4:
                    return e.sent(), [ 3 /*break*/ , 5 ];

                  case 5:
                    return [ 3 /*break*/ , 13 ];

                  case 6:
                    if (t instanceof Kt ? this.eu.Bs(t) : t instanceof $t ? this.eu.zs(t) : this.eu.Ws(t), 
                    n.isEqual(m.min())) return [ 3 /*break*/ , 13 ];
                    e.label = 7;

                  case 7:
                    return e.trys.push([ 7, 11, , 13 ]), [ 4 /*yield*/ , this.Ja.Mh() ];

                  case 8:
                    return i = e.sent(), n.S(i) >= 0 ? [ 4 /*yield*/ , this.Su(n) ] : [ 3 /*break*/ , 10 ];

                    // We have received a target change with a global snapshot if the snapshot
                    // version is not equal to SnapshotVersion.min().
                                      case 9:
                    // We have received a target change with a global snapshot if the snapshot
                    // version is not equal to SnapshotVersion.min().
                    e.sent(), e.label = 10;

                  case 10:
                    return [ 3 /*break*/ , 13 ];

                  case 11:
                    return pe("RemoteStore", "Failed to raise snapshot:", o = e.sent()), [ 4 /*yield*/ , this.vu(o) ];

                  case 12:
                    return e.sent(), [ 3 /*break*/ , 13 ];

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
    t.prototype.vu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n = this;
            return e.__generator(this, (function(r) {
                switch (r.label) {
                  case 0:
                    if ("IndexedDbTransactionError" !== t.name) throw t;
                    // Disable network and raise offline snapshots
                    return this.su = !0, [ 4 /*yield*/ , this.Ru() ];

                  case 1:
                    // Disable network and raise offline snapshots
                    return r.sent(), this.ou.set("Offline" /* Offline */), 
                    // Probe IndexedDB periodically and re-enable network
                    this.Tr.xr((function() {
                        return e.__awaiter(n, void 0, void 0, (function() {
                            return e.__generator(this, (function(t) {
                                switch (t.label) {
                                  case 0:
                                    // Issue a simple read operation to determine if IndexedDB recovered.
                                    // Ideally, we would expose a health check directly on SimpleDb, but
                                    // RemoteStore only has access to persistence through LocalStore.
                                    return pe("RemoteStore", "Retrying IndexedDB access"), [ 4 /*yield*/ , this.Ja.Mh() ];

                                  case 1:
                                    // Issue a simple read operation to determine if IndexedDB recovered.
                                    // Ideally, we would expose a health check directly on SimpleDb, but
                                    // RemoteStore only has access to persistence through LocalStore.
                                    return t.sent(), this.su = !1, [ 4 /*yield*/ , this.wu() ];

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
    t.prototype.Su = function(t) {
        var e = this, n = this.eu.Js(t);
        // Update in-memory resume tokens. LocalStore will update the
        // persistent view of these when applying the completed RemoteEvent.
        // Finally raise remote event
        return n.as.forEach((function(n, r) {
            if (n.resumeToken.rt() > 0) {
                var i = e.tu.get(r);
                // A watched target might have been removed already.
                                i && e.tu.set(r, i.me(n.resumeToken, t));
            }
        })), 
        // Re-establish listens for the targets that have been invalidated by
        // existence filter mismatches.
        n.us.forEach((function(t) {
            var n = e.tu.get(t);
            if (n) {
                // Clear the resume token for the target, since we're in a known mismatch
                // state.
                e.tu.set(t, n.me(N.ht, n.we)), 
                // Cause a hard reset by unwatching and rewatching immediately, but
                // deliberately don't send a resume token so that we get a full update.
                e.yu(t);
                // Mark the target we send as being on behalf of an existence filter
                // mismatch, but don't actually retain that in listenTargets. This ensures
                // that we flag the first re-listen this way without impacting future
                // listens of this target (that might happen e.g. on reconnect).
                var r = new Dt(n.target, t, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                e.Vu(r);
            }
        })), this.gu.xh(n);
    }, 
    /** Handles an error on a target */ t.prototype.bu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    n = t.cause, r = 0, i = t.targetIds, e.label = 1;

                  case 1:
                    return r < i.length ? (o = i[r], this.tu.has(o) ? [ 4 /*yield*/ , this.gu.Cu(o, n) ] : [ 3 /*break*/ , 3 ]) : [ 3 /*break*/ , 5 ];

                  case 2:
                    e.sent(), this.tu.delete(o), this.eu.removeTarget(o), e.label = 3;

                  case 3:
                    e.label = 4;

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
    t.prototype.Iu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Du() ? (t = this.Za.length > 0 ? this.Za[this.Za.length - 1].batchId : -1, 
                    [ 4 /*yield*/ , this.Ja.eo(t) ]) : [ 3 /*break*/ , 5 ];

                  case 1:
                    return null !== (n = e.sent()) ? [ 3 /*break*/ , 2 ] : (0 === this.Za.length && this._u.ca(), 
                    [ 3 /*break*/ , 4 ]);

                  case 2:
                    return this.Fu(n), [ 4 /*yield*/ , this.Iu() ];

                  case 3:
                    e.sent(), e.label = 4;

                  case 4:
                    e.label = 5;

                  case 5:
                    return this.Nu() && this.$u(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, 
    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */
    t.prototype.Du = function() {
        return this.ru() && this.Za.length < 10;
    }, 
    // For testing
    t.prototype.Lu = function() {
        return this.Za.length;
    }, 
    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */
    t.prototype.Fu = function(t) {
        this.Za.push(t), this._u.oa() && this._u.ga && this._u.ba(t.mutations);
    }, t.prototype.Nu = function() {
        return this.ru() && !this._u.ha() && this.Za.length > 0;
    }, t.prototype.$u = function() {
        this._u.start();
    }, t.prototype.fu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                return this._u.Ca(), [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Tu = function() {
        var t = this;
        // Record the stream token.
                return this.Ja.qh(this._u.lastStreamToken).then((function() {
            // Send the write pipeline now that the stream is established.
            for (var e = 0, n = t.Za; e < n.length; e++) {
                var r = n[e];
                t._u.ba(r.mutations);
            }
        })).catch(Fe);
    }, t.prototype.va = function(t, e) {
        var n = this, r = this.Za.shift(), i = Ne.from(r, t, e, this._u.lastStreamToken);
        return this.gu.ku(i).then((function() {
            return n.Iu();
        }));
    }, t.prototype.du = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t && this.Za.length > 0 ? this._u.ga ? [ 4 /*yield*/ , this.Ou(t) ] : [ 3 /*break*/ , 2 ] : [ 3 /*break*/ , 5 ];

                  case 1:
                    // This error affects the actual write.
                    return e.sent(), [ 3 /*break*/ , 4 ];

                  case 2:
                    // If there was an error before the handshake has finished, it's
                    // possible that the server is unable to process the stream token
                    // we're sending. (Perhaps it's too old?)
                    return [ 4 /*yield*/ , this.qu(t) ];

                  case 3:
                    // If there was an error before the handshake has finished, it's
                    // possible that the server is unable to process the stream token
                    // we're sending. (Perhaps it's too old?)
                    e.sent(), e.label = 4;

                  case 4:
                    // The write stream might have been started by refilling the write
                    // pipeline for failed writes
                    this.Nu() && this.$u(), e.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.qu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(e) {
                // Reset the token if it's a permanent error, signaling the write stream is
                // no longer valid. Note that the handshake does not count as a write: see
                // comments on isPermanentWriteError for details.
                return Vt(t.code) ? [ 2 /*return*/ , (pe("RemoteStore", "RemoteStore error before completed handshake; resetting stream token: ", this._u.lastStreamToken), 
                this._u.lastStreamToken = N.ht, this.Ja.qh(N.ht).catch(Fe)) ] : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Ou = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i = this;
            return e.__generator(this, (function(e) {
                // Only handle permanent errors here. If it's transient, just let the retry
                // logic kick in.
                return Vt(r = t.code) && r !== h.ABORTED ? (n = this.Za.shift(), [ 2 /*return*/ , (this._u.ua(), 
                this.gu.Mu(n.batchId, t).then((function() {
                    return i.Iu();
                }))) ]) : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.xu = function() {
        return new Pn(this.$a);
    }, t.prototype.hu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.networkEnabled = !1, [ 4 /*yield*/ , this.Ru() ];

                  case 1:
                    return t.sent(), this.ou.set("Unknown" /* Unknown */), [ 4 /*yield*/ , this.enableNetwork() ];

                  case 2:
                    return t.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Bu = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            return e.__generator(this, (function(t) {
                switch (t.label) {
                  case 0:
                    return this.ru() ? (
                    // Tear down and re-create our network streams. This will ensure we get a fresh auth token
                    // for the new user and re-fill the write pipeline with new mutations from the LocalStore
                    // (since mutations are per-user).
                    pe("RemoteStore", "RemoteStore restarting streams for new credential"), [ 4 /*yield*/ , this.hu() ]) : [ 3 /*break*/ , 2 ];

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
    t.prototype.Uu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.isPrimary = t, t && this.networkEnabled ? [ 4 /*yield*/ , this.enableNetwork() ] : [ 3 /*break*/ , 2 ];

                  case 1:
                    return e.sent(), [ 3 /*break*/ , 5 ];

                  case 2:
                    return (n = t) ? [ 3 /*break*/ , 4 ] : [ 4 /*yield*/ , this.Ru() ];

                  case 3:
                    e.sent(), n = this.ou.set("Unknown" /* Unknown */), e.label = 4;

                  case 4:
                    n, e.label = 5;

                  case 5:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t;
}(), Fn = /** @class */ function() {
    function t() {
        this.activeTargetIds = Wt();
    }
    return t.prototype.Qu = function(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }, t.prototype.Wu = function(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }, 
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */
    t.prototype.ju = function() {
        var t = {
            activeTargetIds: this.activeTargetIds.W(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }, t;
}(), jn = /** @class */ function() {
    function t() {
        this.Gu = new Fn, this.Hu = {}, this.gu = null, this.Qa = null, this.Xn = null;
    }
    return t.prototype.Ku = function(t) {
        // No op.
    }, t.prototype.zu = function(t, e, n) {
        // No op.
    }, t.prototype.Yu = function(t) {
        return this.Gu.Qu(t), this.Hu[t] || "not-current";
    }, t.prototype.Xu = function(t, e, n) {
        this.Hu[t] = e;
    }, t.prototype.Ju = function(t) {
        this.Gu.Wu(t);
    }, t.prototype.Zu = function(t) {
        return this.Gu.activeTargetIds.has(t);
    }, t.prototype.tc = function(t) {
        delete this.Hu[t];
    }, t.prototype.ec = function() {
        return this.Gu.activeTargetIds;
    }, t.prototype.sc = function(t) {
        return this.Gu.activeTargetIds.has(t);
    }, t.prototype.start = function() {
        return this.Gu = new Fn, Promise.resolve();
    }, t.prototype.Rh = function(t, e, n) {
        // No op.
    }, t.prototype.ic = function(t) {
        // No op.
    }, t.prototype.Pu = function() {}, t.prototype.tr = function(t) {}, t;
}(), Gn = function(t) {
    this.key = t;
}, Bn = function(t) {
    this.key = t;
}, zn = /** @class */ function() {
    function t(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.nc = e, this.rc = null, 
        /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
        this.ds = !1, 
        /** Documents in the view but not in the remote target */
        this.hc = zt(), 
        /** Document Keys that have local changes */
        this.ns = zt(), this.oc = new Jt(t.se.bind(t));
    }
    return Object.defineProperty(t.prototype, "ac", {
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */
        get: function() {
            return this.nc;
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
    t.prototype.uc = function(t, e) {
        var n = this, r = e ? e.cc : new Ht, i = e ? e.oc : this.oc, o = e ? e.ns : this.ns, s = i, u = !1, a = this.query.oe() && i.size === this.query.limit ? i.last() : null, h = this.query.ae() && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.ye((function(t, e) {
            var c = i.get(t), f = e instanceof dt ? e : null;
            f && (f = n.query.matches(f) ? f : null);
            var l = !!c && n.ns.has(c.key), p = !!f && (f.At || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            n.ns.has(f.key) && f.hasCommittedMutations), d = !1;
            // Calculate change
            c && f ? c.data().isEqual(f.data()) ? l !== p && (r.track({
                type: 3 /* Metadata */ ,
                doc: f
            }), d = !0) : n.lc(c, f) || (r.track({
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
            oc: s,
            cc: r,
            _c: u,
            ns: o
        };
    }, t.prototype.lc = function(t, e) {
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
    t.prototype.fc = function(t, e, n) {
        var r = this, i = this.oc;
        this.oc = t.oc, this.ns = t.ns;
        // Sort changes based on type and query comparator
        var o = t.cc.es();
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
                        return ve();
                    }
                };
                return n(t) - n(e);
            }(t.type, e.type) || r.query.se(t.doc, e.doc);
        })), this.dc(n);
        var s = e ? this.Tc() : [], u = 0 === this.hc.size && this.ds ? 1 /* Synced */ : 0 /* Local */ , a = u !== this.rc;
        return this.rc = u, 0 !== o.length || a ? {
            snapshot: new Xt(this.query, t.oc, i, o, t.ns, 0 /* Local */ === u, a, 
            /* excludesMetadataChanges= */ !1),
            wc: s
        } : {
            wc: s
        };
        // no changes
        }, 
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */
    t.prototype.Ec = function(t) {
        return this.ds && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.ds = !1, this.fc({
            oc: this.oc,
            cc: new Ht,
            ns: this.ns,
            _c: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            wc: []
        };
    }, 
    /**
     * Returns whether the doc for the given key should be in limbo.
     */
    t.prototype.mc = function(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.nc.has(t) && 
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.oc.has(t) && !this.oc.get(t).At;
    }, 
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */
    t.prototype.dc = function(t) {
        var e = this;
        t && (t.Ts.forEach((function(t) {
            return e.nc = e.nc.add(t);
        })), t.ws.forEach((function(t) {})), t.Es.forEach((function(t) {
            return e.nc = e.nc.delete(t);
        })), this.ds = t.ds);
    }, t.prototype.Tc = function() {
        var t = this;
        // We can only determine limbo documents when we're in-sync with the server.
                if (!this.ds) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                var e = this.hc;
        this.hc = zt(), this.oc.forEach((function(e) {
            t.mc(e.key) && (t.hc = t.hc.add(e.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        var n = [];
        return e.forEach((function(e) {
            t.hc.has(e) || n.push(new Bn(e));
        })), this.hc.forEach((function(t) {
            e.has(t) || n.push(new Gn(t));
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
    t.prototype.Ic = function(t) {
        this.nc = t.lo, this.hc = zt();
        var e = this.uc(t.documents);
        return this.fc(e, /*updateLimboDocuments=*/ !0);
    }, 
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    t.prototype.Rc = function() {
        return Xt.os(this.query, this.oc, this.ns, 0 /* Local */ === this.rc);
    }, t;
}(), Qn = /** @class */ function() {
    function t(t, e, n, r) {
        this.Tr = t, this.Ac = e, this.updateFunction = n, this.mr = r, this.Pc = 5, this.Dr = new Le(this.Tr, "transaction_retry" /* TransactionRetry */)
        /** Runs the transaction and sets the result on deferred. */;
    }
    return t.prototype.Vc = function() {
        this.pc();
    }, t.prototype.pc = function() {
        var t = this;
        this.Dr.lr((function() {
            return e.__awaiter(t, void 0, void 0, (function() {
                var t, n, r = this;
                return e.__generator(this, (function(e) {
                    return t = this.Ac.xu(), (n = this.yc(t)) && n.then((function(e) {
                        r.Tr.Vr((function() {
                            return t.commit().then((function() {
                                r.mr.resolve(e);
                            })).catch((function(t) {
                                r.gc(t);
                            }));
                        }));
                    })).catch((function(t) {
                        r.gc(t);
                    })), [ 2 /*return*/ ];
                }));
            }));
        }));
    }, t.prototype.yc = function(t) {
        try {
            var e = this.updateFunction(t);
            return !D(e) && e.catch && e.then ? e : (this.mr.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.mr.reject(t), null;
        }
    }, t.prototype.gc = function(t) {
        var e = this;
        this.Pc > 0 && this.bc(t) ? (this.Pc -= 1, this.Tr.Vr((function() {
            return e.pc(), Promise.resolve();
        }))) : this.mr.reject(t);
    }, t.prototype.bc = function(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            var e = t.code;
            return "aborted" === e || "failed-precondition" === e || !Vt(e);
        }
        return !1;
    }, t;
}(), Wn = function(
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
}, Jn = function(t) {
    this.key = t, 
    /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
    this.vc = !1;
}, Hn = /** @class */ function() {
    function t(t, e, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    n, r, i) {
        this.Ja = t, this.Ac = e, this.Sc = n, this.currentUser = r, this.Cc = i, this.Dc = null, 
        this.Fc = new Ae((function(t) {
            return t.canonicalId();
        })), this.Nc = new Map, 
        /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query.
             */
        this.$c = [], 
        /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
        this.Lc = new St(E.N), 
        /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
        this.kc = new Map, this.Oc = new je, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.qc = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.Mc = new Map, this.xc = Oe.nh(), this.onlineState = "Unknown" /* Unknown */;
    }
    return Object.defineProperty(t.prototype, "Bc", {
        get: function() {
            return !0;
        },
        enumerable: !0,
        configurable: !0
    }), 
    /** Subscribes to SyncEngine notifications. Has to be called exactly once. */ t.prototype.subscribe = function(t) {
        this.Dc = t;
    }, 
    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */
    t.prototype.listen = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Uc("listen()"), (i = this.Fc.get(t)) ? (
                    // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
                    // already exists when EventManager calls us for the first time. This
                    // happens when the primary tab is already listening to this query on
                    // behalf of another tab and the user of the primary also starts listening
                    // to the query. EventManager will not have an assigned target ID in this
                    // case and calls `listen` to obtain this ID.
                    n = i.targetId, this.Sc.Yu(n), r = i.view.Rc(), [ 3 /*break*/ , 4 ]) : [ 3 /*break*/ , 1 ];

                  case 1:
                    return [ 4 /*yield*/ , this.Ja.no(t.ee()) ];

                  case 2:
                    return o = e.sent(), s = this.Sc.Yu(o.targetId), n = o.targetId, [ 4 /*yield*/ , this.Qc(t, n, "current" === s) ];

                  case 3:
                    r = e.sent(), this.Bc && this.Ac.listen(o), e.label = 4;

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
    t.prototype.Qc = function(t, n, r) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var i, o, s, u, a, h;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return [ 4 /*yield*/ , this.Ja.uo(t, 
                    /* usePreviousResults= */ !0) ];

                  case 1:
                    return i = e.sent(), o = new zn(t, i.lo), s = o.uc(i.documents), u = Zt.fs(n, r && "Offline" /* Offline */ !== this.onlineState), 
                    a = o.fc(s, 
                    /* updateLimboDocuments= */ this.Bc, u), this.Wc(n, a.wc), h = new Wn(t, n, o), 
                    [ 2 /*return*/ , (this.Fc.set(t, h), this.Nc.has(n) ? this.Nc.get(n).push(t) : this.Nc.set(n, [ t ]), 
                    a.snapshot) ];
                }
            }));
        }));
    }, 
    /** Stops listening to the query. */ t.prototype.pu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    // Only clean up the query view and target if this is the only query mapped
                    // to the target.
                    return this.Uc("unlisten()"), n = this.Fc.get(t), (r = this.Nc.get(n.targetId)).length > 1 ? [ 2 /*return*/ , (this.Nc.set(n.targetId, r.filter((function(e) {
                        return !e.isEqual(t);
                    }))), void this.Fc.delete(t)) ] : this.Bc ? (
                    // We need to remove the local query target first to allow us to verify
                    // whether any other client is still interested in this target.
                    this.Sc.Ju(n.targetId), this.Sc.sc(n.targetId) ? [ 3 /*break*/ , 2 ] : [ 4 /*yield*/ , this.Ja.ao(n.targetId, /*keepPersistedTargetData=*/ !1).then((function() {
                        i.Sc.tc(n.targetId), i.Ac.pu(n.targetId), i.jc(n.targetId);
                    })).catch(Fe) ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 3 /*break*/ , 5 ];

                  case 3:
                    return this.jc(n.targetId), [ 4 /*yield*/ , this.Ja.ao(n.targetId, 
                    /*keepPersistedTargetData=*/ !0) ];

                  case 4:
                    e.sent(), e.label = 5;

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
    t.prototype.write = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.Uc("write()"), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 3, , 4 ]), [ 4 /*yield*/ , this.Ja.yh(t) ];

                  case 2:
                    return r = e.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if ("IndexedDbTransactionError" === (i = e.sent()).name) 
                    // If we can't persist the mutation, we reject the user callback and
                    // don't send the mutation. The user can then retry the write.
                    return [ 2 /*return*/ , (de("SyncEngine", "Dropping write that cannot be persisted: " + i), 
                    void n.reject(new c(h.UNAVAILABLE, "Failed to persist write: " + i))) ];
                    throw i;

                  case 4:
                    return this.Sc.Ku(r.batchId), this.Gc(r.batchId, n), [ 4 /*yield*/ , this.Hc(r.bh) ];

                  case 5:
                    return e.sent(), [ 4 /*yield*/ , this.Ac.Iu() ];

                  case 6:
                    return e.sent(), [ 2 /*return*/ ];
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
        new Qn(t, this.Ac, e, n).Vc();
    }, t.prototype.xh = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.Uc("applyRemoteEvent()"), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.Ja.xh(t) ];

                  case 2:
                    return n = e.sent(), 
                    // Update `receivedDocument` as appropriate for any limbo targets.
                    t.as.forEach((function(t, e) {
                        var n = r.kc.get(e);
                        n && (
                        // Since this is a limbo resolution lookup, it's for a single document
                        // and it could be added, modified, or removed, but not a combination.
                        me(t.Ts.size + t.ws.size + t.Es.size <= 1), t.Ts.size > 0 ? n.vc = !0 : t.ws.size > 0 ? me(n.vc) : t.Es.size > 0 && (me(n.vc), 
                        n.vc = !1));
                    })), [ 4 /*yield*/ , this.Hc(n, t) ];

                  case 3:
                    // Update `receivedDocument` as appropriate for any limbo targets.
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , Fe(e.sent()) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

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
    t.prototype.Ec = function(t, e) {
        this.Uc("applyOnlineStateChange()");
        var n = [];
        this.Fc.forEach((function(e, r) {
            var i = r.view.Ec(t);
            i.snapshot && n.push(i.snapshot);
        })), this.Dc.Kc(t), this.Dc.Pa(n), this.onlineState = t;
    }, t.prototype.Cu = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o, s, u, a = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Uc("rejectListens()"), 
                    // PORTING NOTE: Multi-tab only.
                    this.Sc.Xu(t, "rejected", n), r = this.kc.get(t), (i = r && r.key) ? (
                    // Since this query failed, we won't want to manually unlisten to it.
                    // So go ahead and remove it from bookkeeping.
                    this.Lc = this.Lc.remove(i), this.kc.delete(t), this.zc(), o = (o = new St(E.N)).Re(i, new yt(i, m.min())), 
                    s = zt().add(i), u = new Yt(m.min(), 
                    /* targetChanges= */ new Map, 
                    /* targetMismatches= */ new qt(_e), o, s), [ 2 /*return*/ , this.xh(u) ]) : [ 4 /*yield*/ , this.Ja.ao(t, /* keepPersistedTargetData */ !1).then((function() {
                        return a.jc(t, n);
                    })).catch(Fe) ];

                  case 1:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.ku = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.Uc("applySuccessfulWrite()"), n = t.batch.batchId, 
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught
                    // up), so we raise user callbacks first so that they consistently happen
                    // before listen events.
                    this.Yc(n, /*error=*/ null), this.Xc(n), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.Ja.vh(t) ];

                  case 2:
                    return r = e.sent(), this.Sc.zu(n, "acknowledged"), [ 4 /*yield*/ , this.Hc(r) ];

                  case 3:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , Fe(e.sent()) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 6:
                    return [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Mu = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    this.Uc("rejectFailedWrite()"), 
                    // The local store may or may not be able to apply the write result and
                    // raise events immediately (depending on whether the watcher is caught up),
                    // so we raise user callbacks first so that they consistently happen before
                    // listen events.
                    this.Yc(t, n), this.Xc(t), e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 4, , 6 ]), [ 4 /*yield*/ , this.Ja.Nh(t) ];

                  case 2:
                    return r = e.sent(), this.Sc.zu(t, "rejected", n), [ 4 /*yield*/ , this.Hc(r) ];

                  case 3:
                    return e.sent(), [ 3 /*break*/ , 6 ];

                  case 4:
                    return [ 4 /*yield*/ , Fe(e.sent()) ];

                  case 5:
                    return e.sent(), [ 3 /*break*/ , 6 ];

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
    t.prototype.Jc = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Ac.ru() || pe("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."), 
                    [ 4 /*yield*/ , this.Ja.kh() ];

                  case 1:
                    return -1 === (n = e.sent()) ? [ 2 /*return*/ , void t.resolve() ] : ((r = this.Mc.get(n) || []).push(t), 
                    this.Mc.set(n, r), [ 2 /*return*/ ]);
                }
            }));
        }));
    }, 
    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */
    t.prototype.Xc = function(t) {
        (this.Mc.get(t) || []).forEach((function(t) {
            t.resolve();
        })), this.Mc.delete(t);
    }, 
    /** Reject all outstanding callbacks waiting for pending writes to complete. */ t.prototype.Zc = function(t) {
        this.Mc.forEach((function(e) {
            e.forEach((function(e) {
                e.reject(new c(h.CANCELLED, t));
            }));
        })), this.Mc.clear();
    }, t.prototype.Gc = function(t, e) {
        var n = this.qc[this.currentUser.s()];
        n || (n = new St(_e)), n = n.Re(t, e), this.qc[this.currentUser.s()] = n;
    }, 
    /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */
    t.prototype.Yc = function(t, e) {
        var n = this.qc[this.currentUser.s()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
                if (n) {
            var r = n.get(t);
            r && (e ? r.reject(e) : r.resolve(), n = n.remove(t)), this.qc[this.currentUser.s()] = n;
        }
    }, t.prototype.jc = function(t, e) {
        var n = this;
        void 0 === e && (e = null), this.Sc.Ju(t);
        for (var r = 0, i = this.Nc.get(t); r < i.length; r++) {
            var o = i[r];
            this.Fc.delete(o), e && this.Dc.tl(o, e);
        }
        this.Nc.delete(t), this.Bc && this.Oc.Ao(t).forEach((function(t) {
            n.Oc.po(t) || 
            // We removed the last reference for this key
            n.el(t);
        }));
    }, t.prototype.el = function(t) {
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        var e = this.Lc.get(t);
        null !== e && (this.Ac.pu(e), this.Lc = this.Lc.remove(t), this.kc.delete(e), this.zc());
    }, t.prototype.Wc = function(t, e) {
        for (var n = 0, r = e; n < r.length; n++) {
            var i = r[n];
            i instanceof Gn ? (this.Oc.Zh(i.key, t), this.sl(i)) : i instanceof Bn ? (pe("SyncEngine", "Document no longer in limbo: " + i.key), 
            this.Oc.to(i.key, t), this.Oc.po(i.key) || 
            // We removed the last reference for this key
            this.el(i.key)) : ve();
        }
    }, t.prototype.sl = function(t) {
        var e = t.key;
        this.Lc.get(e) || (pe("SyncEngine", "New document in limbo: " + e), this.$c.push(e), 
        this.zc());
    }, 
    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */
    t.prototype.zc = function() {
        for (;this.$c.length > 0 && this.Lc.size < this.Cc; ) {
            var t = this.$c.shift(), e = this.xc.next();
            this.kc.set(e, new Jn(t)), this.Lc = this.Lc.Re(t, e), this.Ac.listen(new Dt(gt.Wt(t.path).ee(), e, 2 /* LimboResolution */ , ke.er));
        }
    }, 
    // Visible for testing
    t.prototype.il = function() {
        return this.Lc;
    }, 
    // Visible for testing
    t.prototype.nl = function() {
        return this.$c;
    }, t.prototype.Hc = function(t, n) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var r, i, o, s = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return r = [], i = [], o = [], this.Fc.forEach((function(e, u) {
                        o.push(Promise.resolve().then((function() {
                            var e = u.view.uc(t);
                            return e._c ? s.Ja.uo(u.query, /* usePreviousResults= */ !1).then((function(t) {
                                var n = t.documents;
                                return u.view.uc(n, e);
                            })) : e;
                            // The query has a limit and some docs were removed, so we need
                            // to re-run the query against the local store to make sure we
                            // didn't lose any good docs that had been past the limit.
                                                })).then((function(t) {
                            var e = n && n.as.get(u.targetId), o = u.view.fc(t, 
                            /* updateLimboDocuments= */ s.Bc, e);
                            if (s.Wc(u.targetId, o.wc), o.snapshot) {
                                s.Bc && s.Sc.Xu(u.targetId, o.snapshot.fromCache ? "not-current" : "current"), r.push(o.snapshot);
                                var a = Ve.Yn(u.targetId, o.snapshot);
                                i.push(a);
                            }
                        })));
                    })), [ 4 /*yield*/ , Promise.all(o) ];

                  case 1:
                    return e.sent(), this.Dc.Pa(r), [ 4 /*yield*/ , this.Ja.Jh(i) ];

                  case 2:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.Uc = function(t) {}, t.prototype.Bu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return n = !this.currentUser.isEqual(t), this.currentUser = t, n ? (
                    // Fails tasks waiting for pending writes requested by previous user.
                    this.Zc("'waitForPendingWrites' promise is rejected due to a user change."), [ 4 /*yield*/ , this.Ja.Rh(t) ]) : [ 3 /*break*/ , 3 ];

                  case 1:
                    return r = e.sent(), 
                    // TODO(b/114226417): Consider calling this only in the primary tab.
                    this.Sc.Rh(t, r.Vh, r.ph), [ 4 /*yield*/ , this.Hc(r.Ph) ];

                  case 2:
                    // TODO(b/114226417): Consider calling this only in the primary tab.
                    e.sent(), e.label = 3;

                  case 3:
                    return [ 4 /*yield*/ , this.Ac.Bu() ];

                  case 4:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.enableNetwork = function() {
        return this.Ac.enableNetwork();
    }, t.prototype.disableNetwork = function() {
        return this.Ac.disableNetwork();
    }, t.prototype.ei = function(t) {
        var e = this.kc.get(t);
        if (e && e.vc) return zt().add(e.key);
        var n = zt(), r = this.Nc.get(t);
        if (!r) return n;
        for (var i = 0, o = r; i < o.length; i++) {
            var s = o[i], u = this.Fc.get(s);
            n = n.ze(u.view.ac);
        }
        return n;
    }, t;
}(), Xn = function() {
    this.rl = void 0, this.hl = [];
}, Yn = /** @class */ function() {
    function t(t) {
        this.gu = t, this.ol = new Ae((function(t) {
            return t.canonicalId();
        })), this.onlineState = "Unknown" /* Unknown */ , this.al = new Set, this.gu.subscribe(this);
    }
    return t.prototype.listen = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o, s, u;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    if (n = t.query, r = !1, (i = this.ol.get(n)) || (r = !0, i = new Xn), !r) return [ 3 /*break*/ , 4 ];
                    e.label = 1;

                  case 1:
                    return e.trys.push([ 1, 3, , 4 ]), o = i, [ 4 /*yield*/ , this.gu.listen(n) ];

                  case 2:
                    return o.rl = e.sent(), [ 3 /*break*/ , 4 ];

                  case 3:
                    if (s = e.sent(), de("EventManager", u = "Initialization of query '" + n + "' failed: " + s), 
                    "IndexedDbTransactionError" !== s.name) throw s;
                    return [ 2 /*return*/ , void t.onError(new c(h.UNAVAILABLE, u)) ];

                  case 4:
                    return this.ol.set(n, i), i.hl.push(t), 
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    t.Ec(this.onlineState), i.rl && t.ul(i.rl) && this.cl(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.pu = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n, r, i, o;
            return e.__generator(this, (function(e) {
                return n = t.query, r = !1, (i = this.ol.get(n)) && (o = i.hl.indexOf(t)) >= 0 && (i.hl.splice(o, 1), 
                r = 0 === i.hl.length), r ? [ 2 /*return*/ , (this.ol.delete(n), this.gu.pu(n)) ] : [ 2 /*return*/ ];
            }));
        }));
    }, t.prototype.Pa = function(t) {
        for (var e = !1, n = 0, r = t; n < r.length; n++) {
            var i = r[n], o = i.query, s = this.ol.get(o);
            if (s) {
                for (var u = 0, a = s.hl; u < a.length; u++) {
                    a[u].ul(i) && (e = !0);
                }
                s.rl = i;
            }
        }
        e && this.cl();
    }, t.prototype.tl = function(t, e) {
        var n = this.ol.get(t);
        if (n) for (var r = 0, i = n.hl; r < i.length; r++) {
            i[r].onError(e);
        }
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
                this.ol.delete(t);
    }, t.prototype.Kc = function(t) {
        this.onlineState = t;
        var e = !1;
        this.ol.forEach((function(n, r) {
            for (var i = 0, o = r.hl; i < o.length; i++) {
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                o[i].Ec(t) && (e = !0);
            }
        })), e && this.cl();
    }, t.prototype.ll = function(t) {
        this.al.add(t), 
        // Immediately fire an initial event, indicating all existing listeners
        // are in-sync.
        t.next();
    }, t.prototype._l = function(t) {
        this.al.delete(t);
    }, 
    // Call all global snapshot listeners that have been set.
    t.prototype.cl = function() {
        this.al.forEach((function(t) {
            t.next();
        }));
    }, t;
}(), Zn = /** @class */ function() {
    function t(t, e, n) {
        this.query = t, this.fl = e, 
        /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
        this.dl = !1, this.Tl = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {}
        /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */;
    }
    return t.prototype.ul = function(t) {
        if (!this.options.includeMetadataChanges) {
            for (
            // Remove the metadata only changes.
            var e = [], n = 0, r = t.docChanges; n < r.length; n++) {
                var i = r[n];
                3 /* Metadata */ !== i.type && e.push(i);
            }
            t = new Xt(t.query, t.docs, t.ss, e, t.ns, t.fromCache, t.rs, 
            /* excludesMetadataChanges= */ !0);
        }
        var o = !1;
        return this.dl ? this.wl(t) && (this.fl.next(t), o = !0) : this.El(t, this.onlineState) && (this.ml(t), 
        o = !0), this.Tl = t, o;
    }, t.prototype.onError = function(t) {
        this.fl.error(t);
    }, 
    /** Returns whether a snapshot was raised. */ t.prototype.Ec = function(t) {
        this.onlineState = t;
        var e = !1;
        return this.Tl && !this.dl && this.El(this.Tl, t) && (this.ml(this.Tl), e = !0), 
        e;
    }, t.prototype.El = function(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                var n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return !(this.options.Il && n || t.docs.M() && "Offline" /* Offline */ !== e);
        // Raise data from cache if we have any documents or we are offline
        }, t.prototype.wl = function(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        var e = this.Tl && this.Tl.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.rs && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }, t.prototype.ml = function(t) {
        t = Xt.os(t.query, t.docs, t.ns, t.fromCache), this.dl = !0, this.fl.next(t);
    }, t;
}(), Kn = /** @class */ function() {
    function t() {}
    return t.prototype.Ih = function(t) {
        this.Rl = t;
    }, t.prototype.Bn = function(t, e, n, i) {
        var o = this;
        // Queries that match all documents don't benefit from using
        // IndexFreeQueries. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
                return e.te() || n.isEqual(m.min()) ? this.Al(t, e) : this.Rl.qn(t, i).next((function(s) {
            var u = o.Pl(e, s);
            return (e.oe() || e.ae()) && o._c(e.xt, u, i, n) ? o.Al(t, e) : (fe() <= r.LogLevel.DEBUG && pe("IndexFreeQueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), e.toString()), 
            o.Rl.Bn(t, e, n).next((function(t) {
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                return u.forEach((function(e) {
                    t = t.Re(e.key, e);
                })), t;
            })));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }, 
    /** Applies the query filter and sorting to the provided documents.  */ t.prototype.Pl = function(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        var n = new qt((function(e, n) {
            return t.se(e, n);
        }));
        return e.forEach((function(e, r) {
            r instanceof dt && t.matches(r) && (n = n.add(r));
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
    t.prototype._c = function(t, e, n, r) {
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
    }, t.prototype.Al = function(t, e) {
        return fe() <= r.LogLevel.DEBUG && pe("IndexFreeQueryEngine", "Using full collection scan to execute query: %s", e.toString()), 
        this.Rl.Bn(t, e, m.min());
    }, t;
}(), $n = /** @class */ function() {
    function t(t, e) {
        this.Fn = t, this.zh = e, 
        /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
        this.Dn = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.Vl = 1, 
        /** The last received stream token from the server, used to acknowledge which
             * responses the client has processed. Stream tokens are opaque checkpoint
             * markers whose only real value is their inclusion in the next request.
             */
        this.lastStreamToken = N.ht, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.pl = new qt(Ge.To);
    }
    return t.prototype.yl = function(t) {
        return De.resolve(0 === this.Dn.length);
    }, t.prototype.vh = function(t, e, n) {
        var r = e.batchId, i = this.gl(r, "acknowledged");
        return me(0 === i), 
        // Verify that the batch in the queue is the one to be acknowledged.
        this.Dn[i], this.lastStreamToken = n, De.resolve();
    }, t.prototype.Oh = function(t) {
        return De.resolve(this.lastStreamToken);
    }, t.prototype.qh = function(t, e) {
        return this.lastStreamToken = e, De.resolve();
    }, t.prototype.gh = function(t, e, n, r) {
        var i = this.Vl;
        this.Vl++, this.Dn.length > 0 && this.Dn[this.Dn.length - 1];
        var o = new Ie(i, e, n, r);
        this.Dn.push(o);
        // Track references by document key and index collection parents.
        for (var s = 0, u = r; s < u.length; s++) {
            var a = u[s];
            this.pl = this.pl.add(new Ge(a.key, i)), this.Fn.hh(t, a.key.path.k());
        }
        return De.resolve(o);
    }, t.prototype.$h = function(t, e) {
        return De.resolve(this.bl(e));
    }, t.prototype.so = function(t, e) {
        var n = e + 1, r = this.vl(n), i = r < 0 ? 0 : r;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return De.resolve(this.Dn.length > i ? this.Dn[i] : null);
    }, t.prototype.kh = function() {
        return De.resolve(0 === this.Dn.length ? -1 : this.Vl - 1);
    }, t.prototype.Ah = function(t) {
        return De.resolve(this.Dn.slice());
    }, t.prototype.$n = function(t, e) {
        var n = this, r = new Ge(e, 0), i = new Ge(e, Number.POSITIVE_INFINITY), o = [];
        return this.pl.Ge([ r, i ], (function(t) {
            var e = n.bl(t.yo);
            o.push(e);
        })), De.resolve(o);
    }, t.prototype.xn = function(t, e) {
        var n = this, r = new qt(_e);
        return e.forEach((function(t) {
            var e = new Ge(t, 0), i = new Ge(t, Number.POSITIVE_INFINITY);
            n.pl.Ge([ e, i ], (function(t) {
                r = r.add(t.yo);
            }));
        })), De.resolve(this.Sl(r));
    }, t.prototype.Gn = function(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        var n = e.path, r = n.length + 1, i = n;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
                E.et(i) || (i = i.child(""));
        var o = new Ge(new E(i), 0), s = new qt(_e);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                return this.pl.He((function(t) {
            var e = t.key.path;
            return !!n.B(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === r && (s = s.add(t.yo)), !0);
        }), o), De.resolve(this.Sl(s));
    }, t.prototype.Sl = function(t) {
        var e = this, n = [];
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
                return t.forEach((function(t) {
            var r = e.bl(t);
            null !== r && n.push(r);
        })), n;
    }, t.prototype.Lh = function(t, e) {
        var n = this;
        me(0 === this.gl(e.batchId, "removed")), this.Dn.shift();
        var r = this.pl;
        return De.forEach(e.mutations, (function(i) {
            var o = new Ge(i.key, e.batchId);
            return r = r.delete(o), n.zh.Cl(t, i.key);
        })).next((function() {
            n.pl = r;
        }));
    }, t.prototype.Dl = function(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }, t.prototype.po = function(t, e) {
        var n = new Ge(e, 0), r = this.pl.Ke(n);
        return De.resolve(e.isEqual(r && r.key));
    }, t.prototype.Fh = function(t) {
        return this.Dn.length, De.resolve();
    }, 
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId The batchId to search for
     * @param action A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */
    t.prototype.gl = function(t, e) {
        return this.vl(t);
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
    t.prototype.vl = function(t) {
        return 0 === this.Dn.length ? 0 : t - this.Dn[0].batchId;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
        }, 
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */
    t.prototype.bl = function(t) {
        var e = this.vl(t);
        return e < 0 || e >= this.Dn.length ? null : this.Dn[e];
    }, t;
}(), tr = /** @class */ function() {
    /**
     * @param sizer Used to assess the size of a document. For eager GC, this is expected to just
     * return 0 to avoid unnecessarily doing the work of calculating the size.
     */
    function t(t, e) {
        this.Fn = t, this.Fl = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new St(E.N), 
        /** Size of all cached documents. */
        this.size = 0
        /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */;
    }
    return t.prototype.Hh = function(t, e, n) {
        var r = e.key, i = this.docs.get(r), o = i ? i.size : 0, s = this.Fl(e);
        return this.docs = this.docs.Re(r, {
            Nl: e,
            size: s,
            readTime: n
        }), this.size += s - o, this.Fn.hh(t, r.path.k());
    }, 
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */
    t.prototype.Gh = function(t) {
        var e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }, t.prototype.kn = function(t, e) {
        var n = this.docs.get(e);
        return De.resolve(n ? n.Nl : null);
    }, t.prototype.getEntries = function(t, e) {
        var n = this, r = Ct();
        return e.forEach((function(t) {
            var e = n.docs.get(t);
            r = r.Re(t, e ? e.Nl : null);
        })), De.resolve(r);
    }, t.prototype.Bn = function(t, e, n) {
        for (var r = Ft(), i = new E(e.path.child("")), o = this.docs.ve(i)
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
        ; o.$e(); ) {
            var s = o.Ne(), u = s.key, a = s.value, h = a.Nl, c = a.readTime;
            if (!e.path.B(u.path)) break;
            c.S(n) <= 0 || h instanceof dt && e.matches(h) && (r = r.Re(h.key, h));
        }
        return De.resolve(r);
    }, t.prototype.$l = function(t, e) {
        return De.forEach(this.docs, (function(t) {
            return e(t);
        }));
    }, t.prototype.Sh = function(e) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new t.Ll(this);
    }, t.prototype.kl = function(t) {
        return De.resolve(this.size);
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
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */
tr.Ll = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).Ul = e, n;
    }
    return e.__extends(n, t), n.prototype.fc = function(t) {
        var e = this, n = [];
        return this.bh.forEach((function(r, i) {
            i ? n.push(e.Ul.Hh(t, i, e.readTime)) : e.Ul.Gh(r);
        })), De.vn(n);
    }, n.prototype.xl = function(t, e) {
        return this.Ul.kn(t, e);
    }, n.prototype.Bl = function(t, e) {
        return this.Ul.getEntries(t, e);
    }, n;
}(/** @class */ function() {
    function t() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.bh = new Ae((function(t) {
            return t.toString();
        })), this.Ol = !1;
    }
    return Object.defineProperty(t.prototype, "readTime", {
        get: function() {
            return this.ql;
        },
        set: function(t) {
            this.ql = t;
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
    t.prototype.Hh = function(t, e) {
        this.Ml(), this.readTime = e, this.bh.set(t.key, t);
    }, 
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */
    t.prototype.Gh = function(t, e) {
        this.Ml(), e && (this.readTime = e), this.bh.set(t, null);
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
    t.prototype.kn = function(t, e) {
        this.Ml();
        var n = this.bh.get(e);
        return void 0 !== n ? De.resolve(n) : this.xl(t, e);
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
        return this.Bl(t, e);
    }, 
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */
    t.prototype.apply = function(t) {
        return this.Ml(), this.Ol = !0, this.fc(t);
    }, 
    /** Helper to assert this.changes is not null  */ t.prototype.Ml = function() {}, 
    t;
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
var er = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /**
             * Maps a target to the data about that target
             */
        this.Ql = new Ae((function(t) {
            return t.canonicalId();
        })), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = m.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.Wl = 0, 
        /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
        this.jl = new je, this.targetCount = 0, this.Gl = Oe.ih();
    }
    return t.prototype.js = function(t, e) {
        return this.Ql.forEach((function(t, n) {
            return e(n);
        })), De.resolve();
    }, t.prototype.Mh = function(t) {
        return De.resolve(this.lastRemoteSnapshotVersion);
    }, t.prototype.Hl = function(t) {
        return De.resolve(this.Wl);
    }, t.prototype.ho = function(t) {
        return this.highestTargetId = this.Gl.next(), De.resolve(this.highestTargetId);
    }, t.prototype.Yh = function(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.Wl && (this.Wl = e), 
        De.resolve();
    }, t.prototype.Kl = function(t) {
        this.Ql.set(t.target, t);
        var e = t.targetId;
        e > this.highestTargetId && (this.Gl = new Oe(e), this.highestTargetId = e), t.sequenceNumber > this.Wl && (this.Wl = t.sequenceNumber);
    }, t.prototype.oo = function(t, e) {
        return this.Kl(e), this.targetCount += 1, De.resolve();
    }, t.prototype.jh = function(t, e) {
        return this.Kl(e), De.resolve();
    }, t.prototype.zl = function(t, e) {
        return this.Ql.delete(e.target), this.jl.Ao(e.targetId), this.targetCount -= 1, 
        De.resolve();
    }, t.prototype.Yl = function(t, e, n) {
        var r = this, i = 0, o = [];
        return this.Ql.forEach((function(s, u) {
            u.sequenceNumber <= e && null === n.get(u.targetId) && (r.Ql.delete(s), o.push(r.Xl(t, u.targetId)), 
            i++);
        })), De.vn(o).next((function() {
            return i;
        }));
    }, t.prototype.Jl = function(t) {
        return De.resolve(this.targetCount);
    }, t.prototype.ro = function(t, e) {
        var n = this.Ql.get(e) || null;
        return De.resolve(n);
    }, t.prototype.Uh = function(t, e, n) {
        return this.jl.mo(e, n), De.resolve();
    }, t.prototype.Bh = function(t, e, n) {
        this.jl.Ro(e, n);
        var r = this.persistence.zh, i = [];
        return r && e.forEach((function(e) {
            i.push(r.Cl(t, e));
        })), De.vn(i);
    }, t.prototype.Xl = function(t, e) {
        return this.jl.Ao(e), De.resolve();
    }, t.prototype.co = function(t, e) {
        var n = this.jl.Vo(e);
        return De.resolve(n);
    }, t.prototype.po = function(t, e) {
        return De.resolve(this.jl.po(e));
    }, t;
}(), nr = /** @class */ function() {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    function t(t) {
        var e = this;
        this.Zl = {}, this.t_ = new ke(0), this.e_ = !1, this.e_ = !0, this.zh = t(this), 
        this.Th = new er(this), this.Fn = new Pe, this.Cn = new tr(this.Fn, (function(t) {
            return e.zh.s_(t);
        }));
    }
    return t.prototype.start = function() {
        return Promise.resolve();
    }, t.prototype.Pu = function() {
        // No durable state to ensure is closed on shutdown.
        return this.e_ = !1, Promise.resolve();
    }, Object.defineProperty(t.prototype, "i_", {
        get: function() {
            return this.e_;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.n_ = function() {
        // No op.
    }, t.prototype.mh = function() {
        return this.Fn;
    }, t.prototype._h = function(t) {
        var e = this.Zl[t.s()];
        return e || (e = new $n(this.Fn, this.zh), this.Zl[t.s()] = e), e;
    }, t.prototype.wh = function() {
        return this.Th;
    }, t.prototype.dh = function() {
        return this.Cn;
    }, t.prototype.runTransaction = function(t, e, n) {
        var r = this;
        pe("MemoryPersistence", "Starting transaction:", t);
        var i = new rr(this.t_.next());
        return this.zh.r_(), n(i).next((function(t) {
            return r.zh.h_(i).next((function() {
                return t;
            }));
        })).gn().then((function(t) {
            return i.o_(), t;
        }));
    }, t.prototype.a_ = function(t, e) {
        return De.Sn(Object.values(this.Zl).map((function(n) {
            return function() {
                return n.po(t, e);
            };
        })));
    }, t;
}(), rr = /** @class */ function(t) {
    function n(e) {
        var n = this;
        return (n = t.call(this) || this).Qh = e, n;
    }
    /**
     * A base class representing a persistence transaction, encapsulating both the
     * transaction's sequence numbers as well as a list of onCommitted listeners.
     *
     * When you call Persistence.runTransaction(), it will create a transaction and
     * pass it to your callback. You then pass it to any method that operates
     * on persistence.
     */
    return e.__extends(n, t), n;
}(/** @class */ function() {
    function t() {
        this.u_ = [];
    }
    return t.prototype.c_ = function(t) {
        this.u_.push(t);
    }, t.prototype.o_ = function() {
        this.u_.forEach((function(t) {
            return t();
        }));
    }, t;
}()), ir = /** @class */ function() {
    function t(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.l_ = new je, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.__ = null;
    }
    return t.f_ = function(e) {
        return new t(e);
    }, Object.defineProperty(t.prototype, "d_", {
        get: function() {
            if (this.__) return this.__;
            throw ve();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.Zh = function(t, e, n) {
        return this.l_.Zh(n, e), this.d_.delete(n), De.resolve();
    }, t.prototype.to = function(t, e, n) {
        return this.l_.to(n, e), this.d_.add(n), De.resolve();
    }, t.prototype.Cl = function(t, e) {
        return this.d_.add(e), De.resolve();
    }, t.prototype.removeTarget = function(t, e) {
        var n = this;
        this.l_.Ao(e.targetId).forEach((function(t) {
            return n.d_.add(t);
        }));
        var r = this.persistence.wh();
        return r.co(t, e.targetId).next((function(t) {
            t.forEach((function(t) {
                return n.d_.add(t);
            }));
        })).next((function() {
            return r.zl(t, e);
        }));
    }, t.prototype.r_ = function() {
        this.__ = new Set;
    }, t.prototype.h_ = function(t) {
        var e = this, n = this.persistence.dh().Sh();
        // Remove newly orphaned documents.
                return De.forEach(this.d_, (function(r) {
            return e.T_(t, r).next((function(t) {
                t || n.Gh(r);
            }));
        })).next((function() {
            return e.__ = null, n.apply(t);
        }));
    }, t.prototype.Kh = function(t, e) {
        var n = this;
        return this.T_(t, e).next((function(t) {
            t ? n.d_.delete(e) : n.d_.add(e);
        }));
    }, t.prototype.s_ = function(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }, t.prototype.T_ = function(t, e) {
        var n = this;
        return De.Sn([ function() {
            return De.resolve(n.l_.po(e));
        }, function() {
            return n.persistence.wh().po(t, e);
        }, function() {
            return n.persistence.a_(t, e);
        } ]);
    }, t;
}(), or = /** @class */ function() {
    function t() {}
    return t.prototype.initialize = function(t) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var n = this;
            return e.__generator(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return this.Sc = this.w_(t), this.persistence = this.E_(t), [ 4 /*yield*/ , this.persistence.start() ];

                  case 1:
                    return e.sent(), this.m_ = this.I_(t), this.Ja = this.R_(t), this.Ac = this.A_(t), 
                    this.gu = this.P_(t), this.V_ = this.p_(t), this.Sc.Qa = function(t) {
                        return n.gu.Ec(t, 1 /* SharedClientState */);
                    }, this.Ac.gu = this.gu, [ 4 /*yield*/ , this.Ja.start() ];

                  case 2:
                    return e.sent(), [ 4 /*yield*/ , this.Sc.start() ];

                  case 3:
                    return e.sent(), [ 4 /*yield*/ , this.Ac.start() ];

                  case 4:
                    return e.sent(), [ 4 /*yield*/ , this.Ac.Uu(this.gu.Bc) ];

                  case 5:
                    return e.sent(), [ 2 /*return*/ ];
                }
            }));
        }));
    }, t.prototype.p_ = function(t) {
        return new Yn(this.gu);
    }, t.prototype.I_ = function(t) {
        return null;
    }, t.prototype.R_ = function(t) {
        return new xe(this.persistence, new Kn, t.y_);
    }, t.prototype.E_ = function(t) {
        return new nr(ir.f_);
    }, t.prototype.A_ = function(t) {
        var e = this;
        return new xn(this.Ja, t.$a, t.Tr, (function(t) {
            return e.gu.Ec(t, 0 /* RemoteStore */);
        }), t.platform.g_());
    }, t.prototype.w_ = function(t) {
        return new jn;
    }, t.prototype.P_ = function(t) {
        return new Hn(this.Ja, this.Ac, this.Sc, t.y_, t.Cc);
    }, t.prototype.clearPersistence = function(t) {
        throw new c(h.FAILED_PRECONDITION, "You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.");
    }, t;
}(), sr = /** @class */ function() {
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
        this.platform = t, this.b_ = e, this.credentials = n, this.Tr = r, this.clientId = we.cn()
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
        this.v_();
        // We defer our initialization until we get the current user from
        // setChangeListener(). We block the async queue until we got the initial
        // user and the initialization is completed. This will prevent any scheduled
        // work from happening before initialization is completed.
        // If initializationDone resolved then the FirestoreClient is in a usable
        // state.
        var r = new Se, i = new Se, o = !1;
        // If usePersistence is true, certain classes of errors while starting are
        // recoverable but only by falling back to persistence disabled.
        // If there's an error in the first case but not in recovery we cannot
        // reject the promise blocking the async queue because this will cause the
        // async queue to panic.
                // Return only the result of enabling persistence. Note that this does not
        // need to await the completion of initializationDone because the result of
        // this method should not reflect any other kind of failure to start.
        return this.credentials._((function(s) {
            if (!o) return o = !0, pe("FirestoreClient", "Initializing. user=", s.uid), n.S_(t, e, s, i).then(r.resolve, r.reject);
            n.Tr.Vr((function() {
                return n.Bu(s);
            }));
        })), 
        // Block the async queue until initialization is done
        this.Tr.Vr((function() {
            return r.promise;
        })), i.promise;
    }, 
    /** Enables the network connection and requeues all pending operations. */ t.prototype.enableNetwork = function() {
        var t = this;
        return this.v_(), this.Tr.enqueue((function() {
            return t.gu.enableNetwork();
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
    t.prototype.S_ = function(t, n, r, i) {
        return e.__awaiter(this, void 0, void 0, (function() {
            var o, s, u, a, h = this;
            return e.__generator(this, (function(c) {
                switch (c.label) {
                  case 0:
                    return c.trys.push([ 0, 3, , 4 ]), [ 4 /*yield*/ , this.platform.C_(this.b_) ];

                  case 1:
                    return o = c.sent(), s = this.platform.Go(this.b_.ii), u = function(t, e, n) {
                        return new On(t, e, n);
                    }(o, this.credentials, s), [ 4 /*yield*/ , t.initialize({
                        Tr: this.Tr,
                        b_: this.b_,
                        platform: this.platform,
                        $a: u,
                        clientId: this.clientId,
                        y_: r,
                        Cc: 100,
                        D_: n
                    }) ];

                  case 2:
                    return c.sent(), this.persistence = t.persistence, this.Sc = t.Sc, this.Ja = t.Ja, 
                    this.Ac = t.Ac, this.gu = t.gu, this.m_ = t.m_, this.F_ = t.V_, 
                    // When a user calls clearPersistence() in one client, all other clients
                    // need to be terminated to allow the delete to succeed.
                    this.persistence.n_((function() {
                        return e.__awaiter(h, void 0, void 0, (function() {
                            return e.__generator(this, (function(t) {
                                switch (t.label) {
                                  case 0:
                                    return [ 4 /*yield*/ , this.terminate() ];

                                  case 1:
                                    return t.sent(), [ 2 /*return*/ ];
                                }
                            }));
                        }));
                    })), i.resolve(), [ 3 /*break*/ , 4 ];

                  case 3:
                    // An unknown failure on the first stage shuts everything down.
                    if (a = c.sent(), 
                    // Regardless of whether or not the retry succeeds, from an user
                    // perspective, offline persistence has failed.
                    i.reject(a), !this.N_(a)) throw a;
                    return [ 2 /*return*/ , (console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + a), 
                    this.S_(new or, {
                        L_: !1
                    }, r, i)) ];

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
    t.prototype.N_ = function(t) {
        return "FirebaseError" === t.name ? t.code === h.FAILED_PRECONDITION || t.code === h.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || 
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
    t.prototype.v_ = function() {
        if (this.Tr.$r) throw new c(h.FAILED_PRECONDITION, "The client has already been terminated.");
    }, t.prototype.Bu = function(t) {
        return this.Tr.Ur(), pe("FirestoreClient", "Credential Changed. Current user: " + t.uid), 
        this.gu.Bu(t);
    }, 
    /** Disables the network connection. Pending operations will not complete. */ t.prototype.disableNetwork = function() {
        var t = this;
        return this.v_(), this.Tr.enqueue((function() {
            return t.gu.disableNetwork();
        }));
    }, t.prototype.terminate = function() {
        var t = this;
        return this.Tr.Mr((function() {
            return e.__awaiter(t, void 0, void 0, (function() {
                return e.__generator(this, (function(t) {
                    switch (t.label) {
                      case 0:
                        // PORTING NOTE: LocalStore does not need an explicit shutdown on web.
                        return this.m_ && this.m_.stop(), [ 4 /*yield*/ , this.Ac.Pu() ];

                      case 1:
                        return t.sent(), [ 4 /*yield*/ , this.Sc.Pu() ];

                      case 2:
                        return t.sent(), [ 4 /*yield*/ , this.persistence.Pu() ];

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
        this.v_();
        var e = new Se;
        return this.Tr.Vr((function() {
            return t.gu.Jc(e);
        })), e.promise;
    }, t.prototype.listen = function(t, e, n) {
        var r = this;
        this.v_();
        var i = new Zn(t, e, n);
        return this.Tr.Vr((function() {
            return r.F_.listen(i);
        })), i;
    }, t.prototype.pu = function(t) {
        var e = this;
        // Checks for termination but does not raise error, allowing unlisten after
        // termination to be a no-op.
                this.k_ || this.Tr.Vr((function() {
            return e.F_.pu(t);
        }));
    }, t.prototype.O_ = function(t) {
        var e = this;
        return this.v_(), this.Tr.enqueue((function() {
            return e.Ja.io(t);
        })).then((function(t) {
            if (t instanceof dt) return t;
            if (t instanceof yt) return null;
            throw new c(h.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)");
        }));
    }, t.prototype.q_ = function(t) {
        var n = this;
        return this.v_(), this.Tr.enqueue((function() {
            return e.__awaiter(n, void 0, void 0, (function() {
                var n, r, i;
                return e.__generator(this, (function(e) {
                    switch (e.label) {
                      case 0:
                        return [ 4 /*yield*/ , this.Ja.uo(t, 
                        /* usePreviousResults= */ !0) ];

                      case 1:
                        return n = e.sent(), r = new zn(t, n.lo), i = r.uc(n.documents), [ 2 /*return*/ , r.fc(i, 
                        /* updateLimboDocuments= */ !1).snapshot ];
                    }
                }));
            }));
        }));
    }, t.prototype.write = function(t) {
        var e = this;
        this.v_();
        var n = new Se;
        return this.Tr.Vr((function() {
            return e.gu.write(t, n);
        })), n.promise;
    }, t.prototype.ii = function() {
        return this.b_.ii;
    }, t.prototype.ll = function(t) {
        var e = this;
        this.v_(), this.Tr.Vr((function() {
            return e.F_.ll(t), Promise.resolve();
        }));
    }, t.prototype._l = function(t) {
        // Checks for shutdown but does not raise error, allowing remove after
        // shutdown to be a no-op.
        this.k_ || this.F_._l(t);
    }, Object.defineProperty(t.prototype, "k_", {
        get: function() {
            // Technically, the asyncQueue is still running, but only accepting operations
            // related to termination or supposed to be run after termination. It is effectively
            // terminated to the eyes of users.
            return this.Tr.$r;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.transaction = function(t) {
        var e = this;
        this.v_();
        var n = new Se;
        return this.Tr.Vr((function() {
            return e.gu.runTransaction(e.Tr, t, n), Promise.resolve();
        })), n.promise;
    }, t;
}(), ur = /** @class */ function() {
    function t(t) {
        this.observer = t, 
        /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
        this.muted = !1;
    }
    return t.prototype.next = function(t) {
        this.M_(this.observer.next, t);
    }, t.prototype.error = function(t) {
        this.M_(this.observer.error, t);
    }, t.prototype.x_ = function() {
        this.muted = !0;
    }, t.prototype.M_ = function(t, e) {
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
function ar(t) {
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

var hr = /** @class */ function() {
    function t(t, e, n, r) {
        this.firestore = t, this.timestampsInSnapshots = e, this.B_ = n, this.converter = r;
    }
    return t.prototype.U_ = function(t) {
        switch (L(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return x(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.Q_(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.W_(t);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return new cn(F(t.bytesValue));

          case 7 /* RefValue */ :
            return this.j_(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.G_(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.H_(t.arrayValue);

          case 10 /* ObjectValue */ :
            return this.K_(t.mapValue);

          default:
            throw ve();
        }
    }, t.prototype.K_ = function(t) {
        var e = this, n = {};
        return A(t.fields || {}, (function(t, r) {
            n[t] = e.U_(r);
        })), n;
    }, t.prototype.G_ = function(t) {
        return new wn(x(t.latitude), x(t.longitude));
    }, t.prototype.H_ = function(t) {
        var e = this;
        return (t.values || []).map((function(t) {
            return e.U_(t);
        }));
    }, t.prototype.W_ = function(t) {
        switch (this.B_) {
          case "previous":
            var e = function t(e) {
                var n = e.mapValue.fields.__previous_value__;
                return V(n) ? t(n) : n;
            }(t);
            return null == e ? null : this.U_(e);

          case "estimate":
            return this.Q_(k(t));

          default:
            return null;
        }
    }, t.prototype.Q_ = function(t) {
        var e = C(t), n = new v(e.seconds, e.nanos);
        return this.timestampsInSnapshots ? n : n.toDate();
    }, t.prototype.j_ = function(t) {
        var e = w.G(t);
        me(ae(e));
        var n = new Te(e.get(1), e.get(3)), r = new E(e.L(5));
        return n.isEqual(this.firestore.Zo) || 
        // TODO(b/64130202): Somehow support foreign references.
        de("Document " + r + " contains a document reference within a different database (" + n.projectId + "/" + n.database + ") which is not supported. It will be treated as a reference in the current database (" + this.firestore.Zo.projectId + "/" + this.firestore.Zo.database + ") instead."), 
        new yr(r, this.firestore, this.converter);
    }, t;
}(), cr = Ue.Jr, fr = /** @class */ function() {
    function t(t) {
        var e, n;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new c(h.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else Xe("settings", "non-empty string", "host", t.host), this.host = t.host, Ye("settings", "boolean", "ssl", t.ssl), 
        this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (nn("settings", t, [ "host", "ssl", "credentials", "timestampsInSnapshots", "cacheSizeBytes", "experimentalForceLongPolling" ]), 
        Ye("settings", "object", "credentials", t.credentials), this.credentials = t.credentials, 
        Ye("settings", "boolean", "timestampsInSnapshots", t.timestampsInSnapshots), 
        // Nobody should set timestampsInSnapshots anymore, but the error depends on
        // whether they set it to true or false...
        !0 === t.timestampsInSnapshots ? de("The setting 'timestampsInSnapshots: true' is no longer required and should be removed.") : !1 === t.timestampsInSnapshots && de("Support for 'timestampsInSnapshots: false' will be removed soon. You must update your code to handle Timestamp objects."), 
        this.timestampsInSnapshots = null === (n = t.timestampsInSnapshots) || void 0 === n || n, 
        Ye("settings", "number", "cacheSizeBytes", t.cacheSizeBytes), void 0 === t.cacheSizeBytes) this.cacheSizeBytes = Ue.th; else {
            if (t.cacheSizeBytes !== cr && t.cacheSizeBytes < Ue.Zr) throw new c(h.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + Ue.Zr);
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        Ye("settings", "boolean", "experimentalForceLongPolling", t.experimentalForceLongPolling), 
        this.forceLongPolling = void 0 !== t.experimentalForceLongPolling && t.experimentalForceLongPolling;
    }
    return t.prototype.isEqual = function(t) {
        return this.host === t.host && this.ssl === t.ssl && this.timestampsInSnapshots === t.timestampsInSnapshots && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.forceLongPolling === t.forceLongPolling;
    }, t;
}(), lr = /** @class */ function() {
    // Note: We are using `MemoryComponentProvider` as a default
    // ComponentProvider to ensure backwards compatibility with the format
    // expected by the console build.
    function t(n, r, i) {
        var o = this;
        if (void 0 === i && (i = new or), this.z_ = null, 
        // Public for use in tests.
        // TODO(mikelehen): Use modularized initialization instead.
        this.Y_ = new qe, this.INTERNAL = {
            delete: function() {
                return e.__awaiter(o, void 0, void 0, (function() {
                    return e.__generator(this, (function(t) {
                        switch (t.label) {
                          case 0:
                            // The client must be initalized to ensure that all subsequent API usage
                            // throws an exception.
                            return this.X_(), [ 4 /*yield*/ , this.J_.terminate() ];

                          case 1:
                            // The client must be initalized to ensure that all subsequent API usage
                            // throws an exception.
                            return t.sent(), [ 2 /*return*/ ];
                        }
                    }));
                }));
            }
        }, "object" == typeof n.options) {
            // This is very likely a Firebase app object
            // TODO(b/34177605): Can we somehow use instanceof?
            var s = n;
            this.z_ = s, this.Zo = t.Z_(s), this.tf = s.name, this.ef = new p(r);
        } else {
            var u = n;
            if (!u.projectId) throw new c(h.INVALID_ARGUMENT, "Must provide projectId");
            this.Zo = new Te(u.projectId, u.database), 
            // Use a default persistenceKey that lines up with FirebaseApp.
            this.tf = "[DEFAULT]", this.ef = new l;
        }
        this.sf = i, this.if = new fr({}), this.nf = new In(this.Zo);
    }
    return t.prototype.settings = function(t) {
        ze("Firestore.settings", arguments, 1), Je("Firestore.settings", "object", 1, t);
        var e = new fr(t);
        if (this.J_ && !this.if.isEqual(e)) throw new c(h.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.");
        this.if = e, void 0 !== e.credentials && (this.ef = function(t) {
            if (!t) return new l;
            switch (t.type) {
              case "gapi":
                var e = t.rf;
                // Make sure this really is a Gapi client.
                                return me(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new y(e, t.V || "0");

              case "provider":
                return t.rf;

              default:
                throw new c(h.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
            }
        }(e.credentials));
    }, t.prototype.enableNetwork = function() {
        return this.X_(), this.J_.enableNetwork();
    }, t.prototype.disableNetwork = function() {
        return this.X_(), this.J_.disableNetwork();
    }, t.prototype.enablePersistence = function(t) {
        var e, n;
        if (this.J_) throw new c(h.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.");
        var r = !1;
        return t && (void 0 !== t.experimentalTabSynchronization && de("The 'experimentalTabSynchronization' setting will be removed. Use 'synchronizeTabs' instead."), 
        r = null !== (n = null !== (e = t.synchronizeTabs) && void 0 !== e ? e : t.experimentalTabSynchronization) && void 0 !== n && n), 
        this.hf(this.sf, {
            L_: !0,
            cacheSizeBytes: this.if.cacheSizeBytes,
            synchronizeTabs: r
        });
    }, t.prototype.clearPersistence = function() {
        return e.__awaiter(this, void 0, void 0, (function() {
            var t, n = this;
            return e.__generator(this, (function(r) {
                if (void 0 !== this.J_ && !this.J_.k_) throw new c(h.FAILED_PRECONDITION, "Persistence cannot be cleared after this Firestore instance is initialized.");
                return t = new Se, [ 2 /*return*/ , (this.Y_.Lr((function() {
                    return e.__awaiter(n, void 0, void 0, (function() {
                        var n, r;
                        return e.__generator(this, (function(e) {
                            switch (e.label) {
                              case 0:
                                return e.trys.push([ 0, 2, , 3 ]), n = this.af(), [ 4 /*yield*/ , this.sf.clearPersistence(n) ];

                              case 1:
                                return e.sent(), t.resolve(), [ 3 /*break*/ , 3 ];

                              case 2:
                                return r = e.sent(), t.reject(r), [ 3 /*break*/ , 3 ];

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
    }, Object.defineProperty(t.prototype, "uf", {
        get: function() {
            return this.X_(), this.J_.k_;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.waitForPendingWrites = function() {
        return this.X_(), this.J_.waitForPendingWrites();
    }, t.prototype.onSnapshotsInSync = function(t) {
        if (this.X_(), ar(t)) return this.cf(t);
        Je("Firestore.onSnapshotsInSync", "function", 1, t);
        var e = {
            next: t
        };
        return this.cf(e);
    }, t.prototype.cf = function(t) {
        var e = this, n = new ur({
            next: function() {
                t.next && t.next();
            },
            error: function(t) {
                throw ve();
            }
        });
        return this.J_.ll(n), function() {
            n.x_(), e.J_._l(n);
        };
    }, t.prototype.X_ = function() {
        return this.J_ || 
        // Kick off starting the client but don't actually wait for it.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.hf(new or, {
            L_: !1
        }), this.J_;
    }, t.prototype.af = function() {
        return new Ee(this.Zo, this.tf, this.if.host, this.if.ssl, this.if.forceLongPolling);
    }, t.prototype.hf = function(t, e) {
        var n = this.af();
        return this.J_ = new sr(he.nt(), n, this.ef, this.Y_), this.J_.start(t, e);
    }, t.Z_ = function(t) {
        if (e = t.options, "projectId", !Object.prototype.hasOwnProperty.call(e, "projectId")) throw new c(h.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
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
 */        if (!n || "string" != typeof n) throw new c(h.INVALID_ARGUMENT, "projectId must be a string in FirebaseApp.options");
        return new Te(n);
    }, Object.defineProperty(t.prototype, "app", {
        get: function() {
            if (!this.z_) throw new c(h.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.z_;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.collection = function(t) {
        return ze("Firestore.collection", arguments, 1), Je("Firestore.collection", "non-empty string", 1, t), 
        this.X_(), new br(w.G(t), this);
    }, t.prototype.doc = function(t) {
        return ze("Firestore.doc", arguments, 1), Je("Firestore.doc", "non-empty string", 1, t), 
        this.X_(), yr.lf(w.G(t), this);
    }, t.prototype.collectionGroup = function(t) {
        if (ze("Firestore.collectionGroup", arguments, 1), Je("Firestore.collectionGroup", "non-empty string", 1, t), 
        t.indexOf("/") >= 0) throw new c(h.INVALID_ARGUMENT, "Invalid collection ID '" + t + "' passed to function Firestore.collectionGroup(). Collection IDs must not contain '/'.");
        return this.X_(), new wr(new gt(w.H, t), this);
    }, t.prototype.runTransaction = function(t) {
        var e = this;
        return ze("Firestore.runTransaction", arguments, 1), Je("Firestore.runTransaction", "function", 1, t), 
        this.X_().transaction((function(n) {
            return t(new pr(e, n));
        }));
    }, t.prototype.batch = function() {
        return this.X_(), new dr(this);
    }, Object.defineProperty(t, "logLevel", {
        get: function() {
            switch (fe()) {
              case r.LogLevel.DEBUG:
                return "debug";

              case r.LogLevel.SILENT:
                return "silent";

              default:
                // The default log level is error
                return "error";
            }
        },
        enumerable: !0,
        configurable: !0
    }), t.setLogLevel = function(t) {
        switch (ze("Firestore.setLogLevel", arguments, 1), Je("Firestore.setLogLevel", "non-empty string", 1, t), 
        t) {
          case "debug":
            le(r.LogLevel.DEBUG);
            break;

          case "error":
            le(r.LogLevel.ERROR);
            break;

          case "silent":
            le(r.LogLevel.SILENT);
            break;

          default:
            throw new c(h.INVALID_ARGUMENT, "Invalid log level: " + t);
        }
    }, 
    // Note: this is not a property because the minifier can't work correctly with
    // the way TypeScript compiler outputs properties.
    t.prototype._f = function() {
        return this.if.timestampsInSnapshots;
    }, t;
}(), pr = /** @class */ function() {
    function t(t, e) {
        this.ff = t, this.df = e;
    }
    return t.prototype.get = function(t) {
        var e = this;
        ze("Transaction.get", arguments, 1);
        var n = Ir("Transaction.get", t, this.ff);
        return this.df.Ma([ n.ta ]).then((function(t) {
            if (!t || 1 !== t.length) return ve();
            var r = t[0];
            if (r instanceof yt) return new mr(e.ff, n.ta, null, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, n.Tf);
            if (r instanceof dt) return new mr(e.ff, n.ta, r, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, n.Tf);
            throw ve();
        }));
    }, t.prototype.set = function(t, e, n) {
        We("Transaction.set", arguments, 2, 3);
        var r = Ir("Transaction.set", t, this.ff);
        n = Er("Transaction.set", n);
        var i = Dr(r.Tf, e, "Transaction.set"), o = i[0], s = i[1], u = n.merge || n.mergeFields ? this.ff.nf.zo(s, o, n.mergeFields) : this.ff.nf.Ho(s, o);
        return this.df.set(r.ta, u), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        return "string" == typeof e || e instanceof fn ? (Qe("Transaction.update", arguments, 3), 
        r = Ir("Transaction.update", t, this.ff), i = this.ff.nf.Xo("Transaction.update", e, n, o)) : (ze("Transaction.update", arguments, 2), 
        r = Ir("Transaction.update", t, this.ff), i = this.ff.nf.Yo("Transaction.update", e)), 
        this.df.update(r.ta, i), this;
    }, t.prototype.delete = function(t) {
        ze("Transaction.delete", arguments, 1);
        var e = Ir("Transaction.delete", t, this.ff);
        return this.df.delete(e.ta), this;
    }, t;
}(), dr = /** @class */ function() {
    function t(t) {
        this.ff = t, this.wf = [], this.Ef = !1;
    }
    return t.prototype.set = function(t, e, n) {
        We("WriteBatch.set", arguments, 2, 3), this.mf();
        var r = Ir("WriteBatch.set", t, this.ff);
        n = Er("WriteBatch.set", n);
        var i = Dr(r.Tf, e, "WriteBatch.set"), o = i[0], s = i[1], u = n.merge || n.mergeFields ? this.ff.nf.zo(s, o, n.mergeFields) : this.ff.nf.Ho(s, o);
        return this.wf = this.wf.concat(u.Mo(r.ta, et.dt())), this;
    }, t.prototype.update = function(t, e, n) {
        for (var r, i, o = [], s = 3; s < arguments.length; s++) o[s - 3] = arguments[s];
        return this.mf(), "string" == typeof e || e instanceof fn ? (Qe("WriteBatch.update", arguments, 3), 
        r = Ir("WriteBatch.update", t, this.ff), i = this.ff.nf.Xo("WriteBatch.update", e, n, o)) : (ze("WriteBatch.update", arguments, 2), 
        r = Ir("WriteBatch.update", t, this.ff), i = this.ff.nf.Yo("WriteBatch.update", e)), 
        this.wf = this.wf.concat(i.Mo(r.ta, et.exists(!0))), this;
    }, t.prototype.delete = function(t) {
        ze("WriteBatch.delete", arguments, 1), this.mf();
        var e = Ir("WriteBatch.delete", t, this.ff);
        return this.wf = this.wf.concat(new st(e.ta, et.dt())), this;
    }, t.prototype.commit = function() {
        return this.mf(), this.Ef = !0, this.wf.length > 0 ? this.ff.X_().write(this.wf) : Promise.resolve();
    }, t.prototype.mf = function() {
        if (this.Ef) throw new c(h.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }, t;
}(), yr = /** @class */ function() {
    function t(t, e, n) {
        this.ta = t, this.firestore = e, this.Tf = n, this.J_ = this.firestore.X_();
    }
    return t.lf = function(e, n, r) {
        if (e.length % 2 != 0) throw new c(h.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + e.j() + " has " + e.length);
        return new t(new E(e), n, r);
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this.ta.path.q();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "parent", {
        get: function() {
            return new br(this.ta.path.k(), this.firestore, this.Tf);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "path", {
        get: function() {
            return this.ta.path.j();
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.collection = function(t) {
        if (ze("DocumentReference.collection", arguments, 1), Je("DocumentReference.collection", "non-empty string", 1, t), 
        !t) throw new c(h.INVALID_ARGUMENT, "Must provide a non-empty collection name to collection()");
        var e = w.G(t);
        return new br(this.ta.path.child(e), this.firestore);
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw rn("isEqual", "DocumentReference", 1, e);
        return this.firestore === e.firestore && this.ta.isEqual(e.ta) && this.Tf === e.Tf;
    }, t.prototype.set = function(t, e) {
        We("DocumentReference.set", arguments, 1, 2), e = Er("DocumentReference.set", e);
        var n = Dr(this.Tf, t, "DocumentReference.set"), r = n[0], i = n[1], o = e.merge || e.mergeFields ? this.firestore.nf.zo(i, r, e.mergeFields) : this.firestore.nf.Ho(i, r);
        return this.J_.write(o.Mo(this.ta, et.dt()));
    }, t.prototype.update = function(t, e) {
        for (var n, r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
        return "string" == typeof t || t instanceof fn ? (Qe("DocumentReference.update", arguments, 2), 
        n = this.firestore.nf.Xo("DocumentReference.update", t, e, r)) : (ze("DocumentReference.update", arguments, 1), 
        n = this.firestore.nf.Yo("DocumentReference.update", t)), this.J_.write(n.Mo(this.ta, et.exists(!0)));
    }, t.prototype.delete = function() {
        return ze("DocumentReference.delete", arguments, 0), this.J_.write([ new st(this.ta, et.dt()) ]);
    }, t.prototype.onSnapshot = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        We("DocumentReference.onSnapshot", arguments, 1, 4);
        var n, r = {
            includeMetadataChanges: !1
        }, i = 0;
        "object" != typeof t[i] || ar(t[i]) || (nn("DocumentReference.onSnapshot", r = t[i], [ "includeMetadataChanges" ]), 
        Ye("DocumentReference.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), 
        i++);
        var o = {
            includeMetadataChanges: r.includeMetadataChanges
        };
        return ar(t[i]) ? n = t[i] : (Je("DocumentReference.onSnapshot", "function", i, t[i]), 
        He("DocumentReference.onSnapshot", "function", i + 1, t[i + 1]), He("DocumentReference.onSnapshot", "function", i + 2, t[i + 2]), 
        n = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.If(o, n);
    }, t.prototype.If = function(t, e) {
        var n = this, r = function(t) {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (r = e.error.bind(e));
        var i = new ur({
            next: function(t) {
                if (e.next) {
                    var r = t.docs.get(n.ta);
                    e.next(new mr(n.firestore, n.ta, r, t.fromCache, t.hasPendingWrites, n.Tf));
                }
            },
            error: r
        }), o = this.J_.listen(gt.Wt(this.ta.path), i, t);
        return function() {
            i.x_(), n.J_.pu(o);
        };
    }, t.prototype.get = function(t) {
        var e = this;
        return We("DocumentReference.get", arguments, 0, 1), Ar("DocumentReference.get", t), 
        new Promise((function(n, r) {
            t && "cache" === t.source ? e.firestore.X_().O_(e.ta).then((function(t) {
                n(new mr(e.firestore, e.ta, t, 
                /*fromCache=*/ !0, t instanceof dt && t.At, e.Tf));
            }), r) : e.Rf(n, r, t);
        }));
    }, t.prototype.Rf = function(t, e, n) {
        var r = this.If({
            includeMetadataChanges: !0,
            Il: !0
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
                e(new c(h.UNAVAILABLE, "Failed to get document because the client is offline.")) : i.exists && i.metadata.fromCache && n && "server" === n.source ? e(new c(h.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : t(i);
            },
            error: e
        });
    }, t.prototype.withConverter = function(e) {
        return new t(this.ta, this.firestore, e);
    }, t;
}(), vr = /** @class */ function() {
    function t(t, e) {
        this.hasPendingWrites = t, this.fromCache = e;
    }
    return t.prototype.isEqual = function(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }, t;
}(), mr = /** @class */ function() {
    function t(t, e, n, r, i, o) {
        this.ff = t, this.ta = e, this.Af = n, this.Pf = r, this.Vf = i, this.Tf = o;
    }
    return t.prototype.data = function(t) {
        if (We("DocumentSnapshot.data", arguments, 0, 1), t = Tr("DocumentSnapshot.data", t), 
        this.Af) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            if (this.Tf) {
                var e = new gr(this.ff, this.ta, this.Af, this.Pf, this.Vf);
                return this.Tf.fromFirestore(e, t);
            }
            return new hr(this.ff, this.ff._f(), t.serverTimestamps, 
            /* converter= */ void 0).U_(this.Af.kt());
        }
    }, t.prototype.get = function(t, e) {
        if (We("DocumentSnapshot.get", arguments, 1, 2), e = Tr("DocumentSnapshot.get", e), 
        this.Af) {
            var n = this.Af.data().field(kn("DocumentSnapshot.get", t));
            if (null !== n) return new hr(this.ff, this.ff._f(), e.serverTimestamps, this.Tf).U_(n);
        }
    }, Object.defineProperty(t.prototype, "id", {
        get: function() {
            return this.ta.path.q();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "ref", {
        get: function() {
            return new yr(this.ta, this.ff, this.Tf);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "exists", {
        get: function() {
            return null !== this.Af;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "metadata", {
        get: function() {
            return new vr(this.Vf, this.Pf);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw rn("isEqual", "DocumentSnapshot", 1, e);
        return this.ff === e.ff && this.Pf === e.Pf && this.ta.isEqual(e.ta) && (null === this.Af ? null === e.Af : this.Af.isEqual(e.Af)) && this.Tf === e.Tf;
    }, t;
}(), gr = /** @class */ function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return e.__extends(n, t), n.prototype.data = function(e) {
        return t.prototype.data.call(this, e);
    }, n;
}(mr), wr = /** @class */ function() {
    function t(t, e, n) {
        this.pf = t, this.firestore = e, this.Tf = n;
    }
    return t.prototype.where = function(e, n, r) {
        ze("Query.where", arguments, 3), en("Query.where", 3, r);
        // Enumerated from the WhereFilterOp type in index.d.ts.
        var i, o = function(t, e, n, r) {
            if (!e.some((function(t) {
                return t === r;
            }))) throw new c(h.INVALID_ARGUMENT, "Invalid value " + tn(r) + " provided to function Query.where() for its " + sn(2) + " argument. Acceptable values: " + e.join(", "));
            return r;
        }(0, [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , "==" /* EQUAL */ , ">=" /* GREATER_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , "array-contains" /* ARRAY_CONTAINS */ , "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], 0, n), s = kn("Query.where", e);
        if (s.Y()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === o || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === o) throw new c(h.INVALID_ARGUMENT, "Invalid Query. You can't perform '" + o + "' queries on FieldPath.documentId().");
            if ("in" /* IN */ === o) {
                this.yf(r, o);
                for (var u = [], a = 0, f = r; a < f.length; a++) {
                    var l = f[a];
                    u.push(this.gf(l));
                }
                i = {
                    arrayValue: {
                        values: u
                    }
                };
            } else i = this.gf(r);
        } else "in" /* IN */ !== o && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== o || this.yf(r, o), 
        i = this.firestore.nf.Jo("Query.where", r, 
        // We only allow nested arrays for IN queries.
        /** allowArrays = */ "in" /* IN */ === o);
        var p = wt.create(s, o, i);
        return this.bf(p), new t(this.pf.Ht(p), this.firestore, this.Tf);
    }, t.prototype.orderBy = function(e, n) {
        var r;
        if (We("Query.orderBy", arguments, 1, 2), He("Query.orderBy", "non-empty string", 2, n), 
        void 0 === n || "asc" === n) r = "asc" /* ASCENDING */; else {
            if ("desc" !== n) throw new c(h.INVALID_ARGUMENT, "Function Query.orderBy() has unknown direction '" + n + "', expected 'asc' or 'desc'.");
            r = "desc" /* DESCENDING */;
        }
        if (null !== this.pf.startAt) throw new c(h.INVALID_ARGUMENT, "Invalid query. You must not call Query.startAt() or Query.startAfter() before calling Query.orderBy().");
        if (null !== this.pf.endAt) throw new c(h.INVALID_ARGUMENT, "Invalid query. You must not call Query.endAt() or Query.endBefore() before calling Query.orderBy().");
        var i = kn("Query.orderBy", e), o = new Nt(i, r);
        return this.vf(o), new t(this.pf.Kt(o), this.firestore, this.Tf);
    }, t.prototype.limit = function(e) {
        return ze("Query.limit", arguments, 1), Je("Query.limit", "number", 1, e), on("Query.limit", 1, e), 
        new t(this.pf.zt(e), this.firestore, this.Tf);
    }, t.prototype.limitToLast = function(e) {
        return ze("Query.limitToLast", arguments, 1), Je("Query.limitToLast", "number", 1, e), 
        on("Query.limitToLast", 1, e), new t(this.pf.Yt(e), this.firestore, this.Tf);
    }, t.prototype.startAt = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        Qe("Query.startAt", arguments, 1);
        var i = this.Sf("Query.startAt", e, n, 
        /*before=*/ !0);
        return new t(this.pf.Xt(i), this.firestore, this.Tf);
    }, t.prototype.startAfter = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        Qe("Query.startAfter", arguments, 1);
        var i = this.Sf("Query.startAfter", e, n, 
        /*before=*/ !1);
        return new t(this.pf.Xt(i), this.firestore, this.Tf);
    }, t.prototype.endBefore = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        Qe("Query.endBefore", arguments, 1);
        var i = this.Sf("Query.endBefore", e, n, 
        /*before=*/ !0);
        return new t(this.pf.Jt(i), this.firestore, this.Tf);
    }, t.prototype.endAt = function(e) {
        for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
        Qe("Query.endAt", arguments, 1);
        var i = this.Sf("Query.endAt", e, n, 
        /*before=*/ !1);
        return new t(this.pf.Jt(i), this.firestore, this.Tf);
    }, t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw rn("isEqual", "Query", 1, e);
        return this.firestore === e.firestore && this.pf.isEqual(e.pf);
    }, t.prototype.withConverter = function(e) {
        return new t(this.pf, this.firestore, e);
    }, 
    /** Helper function to create a bound from a document or fields */ t.prototype.Sf = function(t, e, n, r) {
        if (en(t, 1, e), e instanceof mr) {
            if (n.length > 0) throw new c(h.INVALID_ARGUMENT, "Too many arguments provided to " + t + "().");
            var i = e;
            if (!i.exists) throw new c(h.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + t + "().");
            return this.Cf(i.Af, r);
        }
        var o = [ e ].concat(n);
        return this.Df(t, o, r);
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
    t.prototype.Cf = function(t, e) {
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
        for (var n = [], r = 0, i = this.pf.orderBy; r < i.length; r++) {
            var o = i[r];
            if (o.field.Y()) n.push(j(this.firestore.Zo, t.key)); else {
                var s = t.field(o.field);
                if (V(s)) throw new c(h.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + o.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === s) {
                    var u = o.field.j();
                    throw new c(h.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a document for which the field '" + u + "' (used as the orderBy) does not exist.");
                }
                n.push(s);
            }
        }
        return new It(n, e);
    }, 
    /**
     * Converts a list of field values to a Bound for the given query.
     */
    t.prototype.Df = function(t, e, n) {
        // Use explicit order by's because it has to match the query the user made
        var r = this.pf.Mt;
        if (e.length > r.length) throw new c(h.INVALID_ARGUMENT, "Too many arguments provided to " + t + "(). The number of arguments must be less than or equal to the number of Query.orderBy() clauses");
        for (var i = [], o = 0; o < e.length; o++) {
            var s = e[o];
            if (r[o].field.Y()) {
                if ("string" != typeof s) throw new c(h.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + t + "(), but got a " + typeof s);
                if (!this.pf.le() && -1 !== s.indexOf("/")) throw new c(h.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to " + t + "() must be a plain document ID, but '" + s + "' contains a slash.");
                var u = this.pf.path.child(w.G(s));
                if (!E.et(u)) throw new c(h.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to " + t + "() must result in a valid document path, but '" + u + "' is not because it contains an odd number of segments.");
                var a = new E(u);
                i.push(j(this.firestore.Zo, a));
            } else {
                var f = this.firestore.nf.Jo(t, s);
                i.push(f);
            }
        }
        return new It(i, n);
    }, t.prototype.onSnapshot = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        We("Query.onSnapshot", arguments, 1, 4);
        var n, r = {}, i = 0;
        return "object" != typeof t[i] || ar(t[i]) || (nn("Query.onSnapshot", r = t[i], [ "includeMetadataChanges" ]), 
        Ye("Query.onSnapshot", "boolean", "includeMetadataChanges", r.includeMetadataChanges), 
        i++), ar(t[i]) ? n = t[i] : (Je("Query.onSnapshot", "function", i, t[i]), He("Query.onSnapshot", "function", i + 1, t[i + 1]), 
        He("Query.onSnapshot", "function", i + 2, t[i + 2]), n = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.Ff(this.pf), this.If(r, n);
    }, t.prototype.If = function(t, e) {
        var n = this, r = function(t) {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (r = e.error.bind(e));
        var i = new ur({
            next: function(t) {
                e.next && e.next(new _r(n.firestore, n.pf, t, n.Tf));
            },
            error: r
        }), o = this.firestore.X_(), s = o.listen(this.pf, i, t);
        return function() {
            i.x_(), o.pu(s);
        };
    }, t.prototype.Ff = function(t) {
        if (t.ae() && 0 === t.Mt.length) throw new c(h.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }, t.prototype.get = function(t) {
        var e = this;
        return We("Query.get", arguments, 0, 1), Ar("Query.get", t), this.Ff(this.pf), new Promise((function(n, r) {
            t && "cache" === t.source ? e.firestore.X_().q_(e.pf).then((function(t) {
                n(new _r(e.firestore, e.pf, t, e.Tf));
            }), r) : e.Rf(n, r, t);
        }));
    }, t.prototype.Rf = function(t, e, n) {
        var r = this.If({
            includeMetadataChanges: !0,
            Il: !0
        }, {
            next: function(i) {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                r(), i.metadata.fromCache && n && "server" === n.source ? e(new c(h.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : t(i);
            },
            error: e
        });
    }, 
    /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */
    t.prototype.gf = function(t) {
        if ("string" == typeof t) {
            if ("" === t) throw new c(h.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!this.pf.le() && -1 !== t.indexOf("/")) throw new c(h.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '" + t + "' contains a '/' character.");
            var e = this.pf.path.child(w.G(t));
            if (!E.et(e)) throw new c(h.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '" + e + "' is not because it has an odd number of segments (" + e.length + ").");
            return j(this.firestore.Zo, new E(e));
        }
        if (t instanceof yr) {
            var n = t;
            return j(this.firestore.Zo, n.ta);
        }
        throw new c(h.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + tn(t) + ".");
    }, 
    /**
     * Validates that the value passed into a disjunctrive filter satisfies all
     * array requirements.
     */
    t.prototype.yf = function(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new c(h.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for '" + e.toString() + "' filters.");
        if (t.length > 10) throw new c(h.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters support a maximum of 10 elements in the value array.");
        if (t.indexOf(null) >= 0) throw new c(h.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'null' in the value array.");
        if (t.filter((function(t) {
            return Number.isNaN(t);
        })).length > 0) throw new c(h.INVALID_ARGUMENT, "Invalid Query. '" + e.toString() + "' filters cannot contain 'NaN' in the value array.");
    }, t.prototype.bf = function(t) {
        if (t instanceof wt) {
            var e = [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], n = [ "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], r = e.indexOf(t.op) >= 0, i = n.indexOf(t.op) >= 0;
            if (t.ue()) {
                var o = this.pf.jt();
                if (null !== o && !o.isEqual(t.field)) throw new c(h.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '" + o.toString() + "' and '" + t.field.toString() + "'");
                var s = this.pf.Gt();
                null !== s && this.Nf(t.field, s);
            } else if (i || r) {
                // You can have at most 1 disjunctive filter and 1 array filter. Check if
                // the new filter conflicts with an existing one.
                var u = null;
                if (i && (u = this.pf.ce(n)), null === u && r && (u = this.pf.ce(e)), null != u) 
                // We special case when it's a duplicate op to give a slightly clearer error message.
                throw u === t.op ? new c(h.INVALID_ARGUMENT, "Invalid query. You cannot use more than one '" + t.op.toString() + "' filter.") : new c(h.INVALID_ARGUMENT, "Invalid query. You cannot use '" + t.op.toString() + "' filters with '" + u.toString() + "' filters.");
            }
        }
    }, t.prototype.vf = function(t) {
        if (null === this.pf.Gt()) {
            // This is the first order by. It must match any inequality.
            var e = this.pf.jt();
            null !== e && this.Nf(e, t.field);
        }
    }, t.prototype.Nf = function(t, e) {
        if (!e.isEqual(t)) throw new c(h.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '" + t.toString() + "' and so you must also use '" + t.toString() + "' as your first Query.orderBy(), but your first Query.orderBy() is on field '" + e.toString() + "' instead.");
    }, t;
}(), _r = /** @class */ function() {
    function t(t, e, n, r) {
        this.ff = t, this.$f = e, this.Lf = n, this.Tf = r, this.kf = null, this.Of = null, 
        this.metadata = new vr(n.hasPendingWrites, n.fromCache);
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
            return this.Lf.docs.M();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(t.prototype, "size", {
        get: function() {
            return this.Lf.docs.size;
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.forEach = function(t, e) {
        var n = this;
        We("QuerySnapshot.forEach", arguments, 1, 2), Je("QuerySnapshot.forEach", "function", 1, t), 
        this.Lf.docs.forEach((function(r) {
            t.call(e, n.qf(r));
        }));
    }, Object.defineProperty(t.prototype, "query", {
        get: function() {
            return new wr(this.$f, this.ff, this.Tf);
        },
        enumerable: !0,
        configurable: !0
    }), t.prototype.docChanges = function(t) {
        t && (nn("QuerySnapshot.docChanges", t, [ "includeMetadataChanges" ]), Ye("QuerySnapshot.docChanges", "boolean", "includeMetadataChanges", t.includeMetadataChanges));
        var e = !(!t || !t.includeMetadataChanges);
        if (e && this.Lf.hs) throw new c(h.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this.kf && this.Of === e || (this.kf = 
        /**
     * Calculates the array of firestore.DocumentChange's for a given ViewSnapshot.
     *
     * Exported for testing.
     */
        function(t, e, n, r) {
            if (n.ss.M()) {
                // Special case the first snapshot because index calculation is easy and
                // fast
                var i = 0;
                return n.docChanges.map((function(e) {
                    var o = new gr(t, e.doc.key, e.doc, n.fromCache, n.ns.has(e.doc.key), r);
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
                var i = new gr(t, e.doc.key, e.doc, n.fromCache, n.ns.has(e.doc.key), r), s = -1, u = -1;
                return 0 /* Added */ !== e.type && (s = o.indexOf(e.doc.key), o = o.delete(e.doc.key)), 
                1 /* Removed */ !== e.type && (u = (o = o.add(e.doc)).indexOf(e.doc.key)), {
                    type: Nr(e.type),
                    doc: i,
                    oldIndex: s,
                    newIndex: u
                };
            }));
        }(this.ff, e, this.Lf, this.Tf), this.Of = e), this.kf;
    }, 
    /** Check the equality. The call can be very expensive. */ t.prototype.isEqual = function(e) {
        if (!(e instanceof t)) throw rn("isEqual", "QuerySnapshot", 1, e);
        return this.ff === e.ff && this.$f.isEqual(e.$f) && this.Lf.isEqual(e.Lf) && this.Tf === e.Tf;
    }, t.prototype.qf = function(t) {
        return new gr(this.ff, t.key, t, this.metadata.fromCache, this.Lf.ns.has(t.key), this.Tf);
    }, t;
}(), br = /** @class */ function(t) {
    function n(e, n, r) {
        var i = this;
        if ((i = t.call(this, gt.Wt(e), n, r) || this).Mf = e, e.length % 2 != 1) throw new c(h.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + e.j() + " has " + e.length);
        return i;
    }
    return e.__extends(n, t), Object.defineProperty(n.prototype, "id", {
        get: function() {
            return this.pf.path.q();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "parent", {
        get: function() {
            var t = this.pf.path.k();
            return t.M() ? null : new yr(new E(t), this.firestore);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "path", {
        get: function() {
            return this.pf.path.j();
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.doc = function(t) {
        if (We("CollectionReference.doc", arguments, 0, 1), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        0 === arguments.length && (t = we.cn()), Je("CollectionReference.doc", "non-empty string", 1, t), 
        "" === t) throw new c(h.INVALID_ARGUMENT, "Document path must be a non-empty string");
        var e = w.G(t);
        return yr.lf(this.pf.path.child(e), this.firestore, this.Tf);
    }, n.prototype.add = function(t) {
        ze("CollectionReference.add", arguments, 1), Je("CollectionReference.add", "object", 1, this.Tf ? this.Tf.toFirestore(t) : t);
        var e = this.doc();
        return e.set(t).then((function() {
            return e;
        }));
    }, n.prototype.withConverter = function(t) {
        return new n(this.Mf, this.firestore, t);
    }, n;
}(wr);

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
function Er(t, e) {
    if (void 0 === e) return {
        merge: !1
    };
    if (nn(t, e, [ "merge", "mergeFields" ]), Ye(t, "boolean", "merge", e.merge), function(t, e, n, r, i) {
        void 0 !== r && function(t, e, n, r, i) {
            if (!(r instanceof Array)) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires its " + e + " option to be an array, but it was: " + tn(r));
            for (var o = 0; o < r.length; ++o) if (!i(r[o])) throw new c(h.INVALID_ARGUMENT, "Function " + t + "() requires all " + e + " elements to be " + n + ", but the value at index " + o + " was: " + tn(r[o]));
        }(t, e, n, r, i);
    }(t, "mergeFields", "a string or a FieldPath", e.mergeFields, (function(t) {
        return "string" == typeof t || t instanceof fn;
    })), void 0 !== e.mergeFields && void 0 !== e.merge) throw new c(h.INVALID_ARGUMENT, "Invalid options passed to function " + t + '(): You cannot specify both "merge" and "mergeFields".');
    return e;
}

function Tr(t, e) {
    return void 0 === e ? {} : (nn(t, e, [ "serverTimestamps" ]), Ze(t, 0, "serverTimestamps", e.serverTimestamps, [ "estimate", "previous", "none" ]), 
    e);
}

function Ar(t, e) {
    He(t, "object", 1, e), e && (nn(t, e, [ "source" ]), Ze(t, 0, "source", e.source, [ "default", "server", "cache" ]));
}

function Ir(t, e, n) {
    if (e instanceof yr) {
        if (e.firestore !== n) throw new c(h.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
        return e;
    }
    throw rn(t, "DocumentReference", 1, e);
}

function Nr(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return ve();
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
 */ function Dr(t, e, n) {
    var r;
    return t ? (r = t.toFirestore(e), n = "toFirestore() in " + n) : r = e, [ r, n ];
}

function Rr(t, e) {
    function n() {
        var t = "This constructor is private.";
        throw e && (t += " ", t += e), new c(h.INVALID_ARGUMENT, t);
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
var Vr = Rr(lr, "Use firebase.firestore() instead."), kr = Rr(pr, "Use firebase.firestore().runTransaction() instead."), Sr = Rr(dr, "Use firebase.firestore().batch() instead."), Lr = Rr(yr, "Use firebase.firestore().doc() instead."), Mr = Rr(mr), qr = Rr(gr), Ur = Rr(wr), Or = Rr(_r), Pr = Rr(br, "Use firebase.firestore().collection() instead."), Cr = Rr(/** @class */ function() {
    function t() {}
    return t.delete = function() {
        return Be("FieldValue.delete", arguments), new dn;
    }, t.serverTimestamp = function() {
        return Be("FieldValue.serverTimestamp", arguments), new yn;
    }, t.arrayUnion = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we need access to the Firestore instance.
                return Qe("FieldValue.arrayUnion", arguments, 1), new vn(t);
    }, t.arrayRemove = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we need access to the Firestore instance.
                return Qe("FieldValue.arrayRemove", arguments, 1), new mn(t);
    }, t.increment = function(t) {
        return Je("FieldValue.increment", "number", 1, t), ze("FieldValue.increment", arguments, 1), 
        new gn(t);
    }, t.prototype.isEqual = function(t) {
        return this === t;
    }, t;
}(), "Use FieldValue.<field>() instead."), xr = Rr(cn, "Use Blob.fromUint8Array() or Blob.fromBase64String() instead."), Fr = {
    Firestore: Vr,
    GeoPoint: wn,
    Timestamp: v,
    Blob: xr,
    Transaction: kr,
    WriteBatch: Sr,
    DocumentReference: Lr,
    DocumentSnapshot: Mr,
    Query: Ur,
    QueryDocumentSnapshot: qr,
    QuerySnapshot: Or,
    CollectionReference: Pr,
    FieldPath: fn,
    FieldValue: Cr,
    setLogLevel: lr.setLogLevel,
    CACHE_SIZE_UNLIMITED: cr
}, jr = /** @class */ function() {
    function t() {}
    return t.prototype.nu = function(t) {
        // No-op.
    }, t.prototype.Pu = function() {
        // No-op.
    }, t;
}(), Gr = /** @class */ function() {
    function t() {
        var t = this;
        this.xf = function() {
            return t.Bf();
        }, this.Uf = function() {
            return t.Qf();
        }, this.Wf = [], this.jf();
    }
    return t.prototype.nu = function(t) {
        this.Wf.push(t);
    }, t.prototype.Pu = function() {
        window.removeEventListener("online", this.xf), window.removeEventListener("offline", this.Uf);
    }, t.prototype.jf = function() {
        window.addEventListener("online", this.xf), window.addEventListener("offline", this.Uf);
    }, t.prototype.Bf = function() {
        pe("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (var t = 0, e = this.Wf; t < e.length; t++) {
            (0, e[t])(0 /* AVAILABLE */);
        }
    }, t.prototype.Qf = function() {
        pe("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (var t = 0, e = this.Wf; t < e.length; t++) {
            (0, e[t])(1 /* UNAVAILABLE */);
        }
    }, 
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    t.Gf = function() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }, t;
}(), Br = /** @class */ function() {
    function t(t) {
        this.Hf = t.Hf, this.Kf = t.Kf;
    }
    return t.prototype.Ra = function(t) {
        this.zf = t;
    }, t.prototype.Ta = function(t) {
        this.Yf = t;
    }, t.prototype.onMessage = function(t) {
        this.Xf = t;
    }, t.prototype.close = function() {
        this.Kf();
    }, t.prototype.send = function(t) {
        this.Hf(t);
    }, t.prototype.Jf = function() {
        this.zf();
    }, t.prototype.Zf = function(t) {
        this.Yf(t);
    }, t.prototype.td = function(t) {
        this.Xf(t);
    }, t;
}(), zr = {
    BatchGetDocuments: "batchGet",
    Commit: "commit"
}, Qr = "gl-js/ fire/" + u, Wr = /** @class */ function() {
    function t(t) {
        this.ii = t.ii;
        var e = t.ssl ? "https" : "http";
        this.ed = e + "://" + t.host, this.forceLongPolling = t.forceLongPolling;
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */    return t.prototype.sd = function(t, e) {
        if (e) for (var n in e.o) e.o.hasOwnProperty(n) && (t[n] = e.o[n]);
        t["X-Goog-Api-Client"] = Qr;
    }, t.prototype.Fa = function(t, e, n) {
        var r = this, i = this.nd(t);
        return new Promise((function(o, u) {
            var a = new s.XhrIo;
            a.listenOnce(s.EventType.COMPLETE, (function() {
                try {
                    switch (a.getLastErrorCode()) {
                      case s.ErrorCode.NO_ERROR:
                        var e = a.getResponseJson();
                        pe("Connection", "XHR received:", JSON.stringify(e)), o(e);
                        break;

                      case s.ErrorCode.TIMEOUT:
                        pe("Connection", 'RPC "' + t + '" timed out'), u(new c(h.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case s.ErrorCode.HTTP_ERROR:
                        var n = a.getStatus();
                        if (pe("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", a.getResponseText()), 
                        n > 0) {
                            var r = a.getResponseJson().error;
                            if (r && r.status && r.message) {
                                var i = function(t) {
                                    var e = t.toLowerCase().replace("_", "-");
                                    return Object.values(h).indexOf(e) >= 0 ? e : h.UNKNOWN;
                                }(r.status);
                                u(new c(i, r.message));
                            } else u(new c(h.UNKNOWN, "Server responded with status " + a.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        pe("Connection", 'RPC "' + t + '" failed'), u(new c(h.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        ve();
                    }
                } finally {
                    pe("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            // The database field is already encoded in URL. Specifying it again in
            // the body is not necessary in production, and will cause duplicate field
            // errors in the Firestore Emulator. Let's remove it.
            var f = Object.assign({}, e);
            delete f.database;
            var l = JSON.stringify(f);
            pe("Connection", "XHR sending: ", i + " " + l);
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the
            // $httpOverwrite parameter supported by ESF to avoid
            // triggering preflight requests.
            var p = {
                "Content-Type": "text/plain"
            };
            r.sd(p, n), a.send(i, "POST", l, p, 15);
        }));
    }, t.prototype.Na = function(t, e, n) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.Fa(t, e, n);
    }, t.prototype.Aa = function(t, e) {
        var n = [ this.ed, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], r = s.createWebChannelTransport(), o = {
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
        this.sd(o.initMessageHeaders, e), 
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
        i.isMobileCordova() || i.isReactNative() || i.isElectron() || i.isIE() || i.isUWP() || i.isBrowserExtension() || (o.httpHeadersOverwriteParam = "$httpHeaders");
        var u = n.join("");
        pe("Connection", "Creating WebChannel: " + u + " " + o);
        var a = r.createWebChannel(u, o), f = !1, l = !1, p = new Br({
            Hf: function(t) {
                l ? pe("Connection", "Not sending because WebChannel is closed:", t) : (f || (pe("Connection", "Opening WebChannel transport."), 
                a.open(), f = !0), pe("Connection", "WebChannel sending:", t), a.send(t));
            },
            Kf: function() {
                return a.close();
            }
        }), d = function(t, e) {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            a.listen(t, (function(t) {
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
        return d(s.WebChannel.EventType.OPEN, (function() {
            l || pe("Connection", "WebChannel transport opened.");
        })), d(s.WebChannel.EventType.CLOSE, (function() {
            l || (l = !0, pe("Connection", "WebChannel transport closed"), p.Zf());
        })), d(s.WebChannel.EventType.ERROR, (function(t) {
            l || (l = !0, pe("Connection", "WebChannel transport errored:", t), p.Zf(new c(h.UNAVAILABLE, "The operation could not be completed")));
        })), d(s.WebChannel.EventType.MESSAGE, (function(t) {
            var e;
            if (!l) {
                var n = t.data[0];
                me(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                var r = n, i = r.error || (null === (e = r[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    pe("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    var o = i.status, s = function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var e = ft[t];
                        if (void 0 !== e) return kt(e);
                    }(o), u = i.message;
                    void 0 === s && (s = h.INTERNAL, u = "Unknown error status: " + o + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    l = !0, p.Zf(new c(s, u)), a.close();
                } else pe("Connection", "WebChannel received:", n), p.td(n);
            }
        })), setTimeout((function() {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            p.Jf();
        }), 0), p;
    }, 
    // visible for testing
    t.prototype.nd = function(t) {
        var e = zr[t];
        return this.ed + "/v1/projects/" + this.ii.projectId + "/databases/" + this.ii.database + "/documents:" + e;
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
 * Registers the memory-only Firestore build with the components framework.
 */
function Jr(t) {
    /**
 * Configures Firestore as part of the Firebase SDK by calling registerService.
 *
 * @param firebase The FirebaseNamespace to register Firestore with
 * @param firestoreFactory A factory function that returns a new Firestore
 *    instance.
 */
    !function(t, e) {
        t.INTERNAL.registerComponent(new o.Component("firestore", (function(t) {
            return function(t, e) {
                return new lr(t, e, new or);
            }(t.getProvider("app").getImmediate(), t.getProvider("auth-internal"));
        }), "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, Fr)));
    }(t), t.registerVersion("@firebase/firestore", "1.14.4");
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
// Implements the Platform API for browsers and some browser-like environments
// (including ReactNative).
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
 */
he.an(new (/** @class */ function() {
    function t() {
        this.bo = "undefined" != typeof atob;
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
    }), t.prototype.C_ = function(t) {
        return Promise.resolve(new Wr(t));
    }, t.prototype.g_ = function() {
        return Gr.Gf() ? new Gr : new jr;
    }, t.prototype.Go = function(t) {
        return new ue(t, {
            hi: !0
        });
    }, t.prototype.un = function(t) {
        return JSON.stringify(t);
    }, t.prototype.atob = function(t) {
        return atob(t);
    }, t.prototype.btoa = function(t) {
        return btoa(t);
    }, t.prototype.ln = function(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        var e = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
        if (e) e.getRandomValues(n); else 
        // Falls back to Math.random
        for (var r = 0; r < t; r++) n[r] = Math.floor(256 * Math.random());
        return n;
    }, t;
}())), Jr(n), exports.__PRIVATE_registerFirestore = Jr;
//# sourceMappingURL=index.memory.cjs.js.map
