

/**
 * DevChess - A fully-featured chess game implementation
 */

// Game state variables
let board = [];
let selectedPiece = null;
let currentPlayer = 'white';
let moveHistory = [];
let capturedPieces = { white: [], black: [] };
let kings = { white: null, black: null };
let inCheck = { white: false, black: false };
let gameOver = false;
let promotionPending = null;
let timers = {
    white: 600, // 10 minutes in seconds
    black: 600,
    active: false,
    interval: null
};

// Piece movement patterns
const movementPatterns = {
    pawn: { direction: 1, firstMove: true, enPassant: false },
    knight: { moves: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]] },
    bishop: { diagonal: true },
    rook: { straight: true, hasMoved: false },
    queen: { diagonal: true, straight: true },
    king: { moves: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]], hasMoved: false }
};

// Initialize the game
function initGame() {
    createBoard();
    initializePieces();
    document.getElementById('undo-btn').addEventListener('click', undoMove);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.querySelectorAll('.promotion-piece').forEach(piece => {
        piece.addEventListener('click', handlePromotion);
    });
    updateUI();
}

// Create the chessboard
function createBoard() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';
    board = [];
    
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    
    for (let i = 0; i < 8; i++) {
        const rank = [];
        for (let j = 0; j < 8; j++) {
            const position = files[j] + ranks[i];
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.position = position;
            square.addEventListener('click', handleSquareClick);
            chessboard.appendChild(square);
            
            // Initialize empty square
            rank.push({
                position,
                piece: null,
                element: square
            });
        }
        board.push(rank);
    }
}

// Initialize chess pieces in their starting positions
function initializePieces() {
    // Initial position for pawns
    for (let i = 0; i < 8; i++) {
        createPiece('pawn', 'white', 6, i);
        createPiece('pawn', 'black', 1, i);
    }
    
    // Initial position for rooks
    createPiece('rook', 'white', 7, 0);
    createPiece('rook', 'white', 7, 7);
    createPiece('rook', 'black', 0, 0);
    createPiece('rook', 'black', 0, 7);
    
    // Initial position for knights
    createPiece('knight', 'white', 7, 1);
    createPiece('knight', 'white', 7, 6);
    createPiece('knight', 'black', 0, 1);
    createPiece('knight', 'black', 0, 6);
    
    // Initial position for bishops
    createPiece('bishop', 'white', 7, 2);
    createPiece('bishop', 'white', 7, 5);
    createPiece('bishop', 'black', 0, 2);
    createPiece('bishop', 'black', 0, 5);
    
    // Initial position for queens
    createPiece('queen', 'white', 7, 3);
    createPiece('queen', 'black', 0, 3);
    
    // Initial position for kings
    createPiece('king', 'white', 7, 4);
    createPiece('king', 'black', 0, 4);
    
    kings.white = board[7][4];
    kings.black = board[0][4];
}

// Create a chess piece and place it on the board
function createPiece(type, color, row, col) {
    const pieceElement = document.createElement('div');
    pieceElement.classList.add('piece', `${color}-piece`);
    
    // Unicode representations of chess pieces
    const pieceUnicodes = {
        white: {
            king: '♔',
            queen: '♕',
            rook: '♖',
            bishop: '♗',
            knight: '♘',
            pawn: '♙'
        },
        black: {
            king: '♚',
            queen: '♛',
            rook: '♜',
            bishop: '♝',
            knight: '♞',
            pawn: '♟'
        }
    };
    
    pieceElement.textContent = pieceUnicodes[color][type];
    
    // Create a piece object with necessary properties
    const piece = {
        type,
        color,
        element: pieceElement,
        ...JSON.parse(JSON.stringify(movementPatterns[type])) // Clone movement patterns
    };
    
    // Add direction for pawns (white moves up, black moves down)
    if (type === 'pawn') {
        piece.direction = color === 'white' ? -1 : 1;
    }
    
    // Place the piece on the board
    board[row][col].piece = piece;
    board[row][col].element.appendChild(pieceElement);
}

// Handle click on a chess square
function handleSquareClick(event) {
    if (gameOver || promotionPending) return;
    
    // Start the timer if not active
    if (!timers.active) {
        startTimer();
    }
    
    const clickedSquare = getSquareFromElement(event.currentTarget);
    
    // If a piece is already selected
    if (selectedPiece) {
        // Get valid moves for the selected piece
        const validMoves = getValidMoves(selectedPiece);
        
        // Check if the clicked square is a valid move
        const moveToMake = validMoves.find(move => 
            move.to.position === clickedSquare.position
        );
        
        if (moveToMake) {
            // Make the move
            makeMove(moveToMake);
            
            // Reset selection
            clearHighlights();
            selectedPiece = null;
        } else if (clickedSquare.piece && clickedSquare.piece.color === currentPlayer) {
            // If clicking on another piece of the same color, select that piece instead
            clearHighlights();
            selectedPiece = clickedSquare;
            highlightSquare(selectedPiece.element, 'selected');
            highlightValidMoves(getValidMoves(selectedPiece));
        } else {
            // If clicking on an invalid square, clear selection
            clearHighlights();
            selectedPiece = null;
        }
    } else if (clickedSquare.piece && clickedSquare.piece.color === currentPlayer) {
        // Select the piece if it belongs to the current player
        selectedPiece = clickedSquare;
        highlightSquare(selectedPiece.element, 'selected');
        highlightValidMoves(getValidMoves(selectedPiece));
    }
}

// Get all valid moves for a piece
function getValidMoves(square) {
    const piece = square.piece;
    if (!piece) return [];
    
    const row = getRowFromPosition(square.position);
    const col = getColFromPosition(square.position);
    let validMoves = [];
    
    switch (piece.type) {
        case 'pawn':
            validMoves = getPawnMoves(row, col, piece);
            break;
        case 'knight':
            validMoves = getKnightMoves(row, col, piece);
            break;
        case 'bishop':
            validMoves = getBishopMoves(row, col, piece);
            break;
        case 'rook':
            validMoves = getRookMoves(row, col, piece);
            break;
        case 'queen':
            validMoves = getQueenMoves(row, col, piece);
            break;
        case 'king':
            validMoves = getKingMoves(row, col, piece);
            break;
    }
    
    // Filter out moves that would put or leave the king in check
    return validMoves.filter(move => !wouldBeInCheck(move, piece.color));
}

// Get valid moves for a pawn
function getPawnMoves(row, col, piece) {
    const moves = [];
    const direction = piece.direction;
    const color = piece.color;
    
    // Forward move
    if (isValidPosition(row + direction, col) && !board[row + direction][col].piece) {
        moves.push({ from: board[row][col], to: board[row + direction][col] });
        
        // Double move on first move
        if ((color === 'white' && row === 6) || (color === 'black' && row === 1)) {
            if (!board[row + 2 * direction][col].piece) {
                moves.push({ 
                    from: board[row][col], 
                    to: board[row + 2 * direction][col],
                    enPassantFlag: true
                });
            }
        }
    }
    
    // Capture moves
    [-1, 1].forEach(offset => {
        if (isValidPosition(row + direction, col + offset)) {
            const targetSquare = board[row + direction][col + offset];
            if (targetSquare.piece && targetSquare.piece.color !== color) {
                moves.push({ from: board[row][col], to: targetSquare });
            }
        }
    });
    
    // En passant captures
    [-1, 1].forEach(offset => {
        if (isValidPosition(row, col + offset)) {
            const adjacentSquare = board[row][col + offset];
            if (adjacentSquare.piece && 
                adjacentSquare.piece.type === 'pawn' && 
                adjacentSquare.piece.color !== color && 
                adjacentSquare.piece.enPassant) {
                moves.push({ 
                    from: board[row][col], 
                    to: board[row + direction][col + offset],
                    isEnPassant: true,
                    capturedPiece: adjacentSquare
                });
            }
        }
    });
    
    // Check for promotion
    moves.forEach(move => {
        const targetRow = getRowFromPosition(move.to.position);
        if ((color === 'white' && targetRow === 0) || (color === 'black' && targetRow === 7)) {
            move.isPromotion = true;
        }
    });
    
    return moves;
}

// Get valid moves for a knight
function getKnightMoves(row, col, piece) {
    const moves = [];
    const color = piece.color;
    
    piece.moves.forEach(([rowOffset, colOffset]) => {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        
        if (isValidPosition(newRow, newCol)) {
            const targetSquare = board[newRow][newCol];
            if (!targetSquare.piece || targetSquare.piece.color !== color) {
                moves.push({ from: board[row][col], to: targetSquare });
            }
        }
    });
    
    return moves;
}

// Get valid moves for a bishop
function getBishopMoves(row, col, piece) {
    const moves = [];
    const color = piece.color;
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]]; // Diagonal directions
    
    directions.forEach(([rowDir, colDir]) => {
        for (let i = 1; i < 8; i++) {
            const newRow = row + rowDir * i;
            const newCol = col + colDir * i;
            
            if (!isValidPosition(newRow, newCol)) break;
            
            const targetSquare = board[newRow][newCol];
            if (!targetSquare.piece) {
                moves.push({ from: board[row][col], to: targetSquare });
            } else {
                if (targetSquare.piece.color !== color) {
                    moves.push({ from: board[row][col], to: targetSquare });
                }
                break;
            }
        }
    });
    
    return moves;
}

// Get valid moves for a rook
function getRookMoves(row, col, piece) {
    const moves = [];
    const color = piece.color;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Horizontal and vertical directions
    
    directions.forEach(([rowDir, colDir]) => {
        for (let i = 1; i < 8; i++) {
            const newRow = row + rowDir * i;
            const newCol = col + colDir * i;
            
            if (!isValidPosition(newRow, newCol)) break;
            
            const targetSquare = board[newRow][newCol];
            if (!targetSquare.piece) {
                moves.push({ from: board[row][col], to: targetSquare });
            } else {
                if (targetSquare.piece.color !== color) {
                    moves.push({ from: board[row][col], to: targetSquare });
                }
                break;
            }
        }
    });
    
    return moves;
}

// Get valid moves for a queen (combination of bishop and rook)
function getQueenMoves(row, col, piece) {
    return [
        ...getBishopMoves(row, col, piece),
        ...getRookMoves(row, col, piece)
    ];
}

// Get valid moves for a king
function getKingMoves(row, col, piece) {
    const moves = [];
    const color = piece.color;
    
    // Normal king moves
    piece.moves.forEach(([rowOffset, colOffset]) => {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        
        if (isValidPosition(newRow, newCol)) {
            const targetSquare = board[newRow][newCol];
            if (!targetSquare.piece || targetSquare.piece.color !== color) {
                moves.push({ from: board[row][col], to: targetSquare });
            }
        }
    });
    
    // Castling moves
    if (!piece.hasMoved && !inCheck[color]) {
        // Kingside castling
        if (isValidCastling(row, col, 0, 3)) {
            moves.push({
                from: board[row][col],
                to: board[row][col + 2],
                isCastling: true,
                rookFrom: board[row][7],
                rookTo: board[row][5]
            });
        }
        
        // Queenside castling
        if (isValidCastling(row, col, 0, -4)) {
            moves.push({
                from: board[row][col],
                to: board[row][col - 2],
                isCastling: true,
                rookFrom: board[row][0],
                rookTo: board[row][3]
            });
        }
    }
    
    return moves;
}

// Check if castling is valid
function isValidCastling(row, col, rookOffset, checkRange) {
    const rookCol = col + checkRange;
    if (!isValidPosition(row, rookCol)) return false;
    
    const rookSquare = board[row][rookCol];
    if (!rookSquare.piece || 
        rookSquare.piece.type !== 'rook' || 
        rookSquare.piece.hasMoved) {
        return false;
    }
    
    // Check if squares between king and rook are empty
    const start = Math.min(col, rookCol) + 1;
    const end = Math.max(col, rookCol);
    for (let i = start; i < end; i++) {
        if (board[row][i].piece) return false;
    }
    
    // Check if king doesn't move through check
    const step = checkRange > 0 ? 1 : -1;
    for (let i = 0; i < 2; i++) {
        const testMove = {
            from: board[row][col],
            to: board[row][col + step * (i + 1)]
        };
        if (wouldBeInCheck(testMove, rookSquare.piece.color)) return false;
    }
    
    return true;
}

// Make a move
// Make a move
function makeMove(move) {
    const { from, to, isCastling, isEnPassant, capturedPiece, isPromotion, enPassantFlag } = move;
    const piece = from.piece;
    
    // Store move for history
    const historyEntry = {
        piece: { ...piece },
        from: from.position,
        to: to.position,
        captured: to.piece ? { ...to.piece } : null,
        isCastling,
        isEnPassant,
        capturedPawn: isEnPassant ? { ...capturedPiece.piece } : null,
        capturedPawnPos: isEnPassant ? capturedPiece.position : null,
        isPromotion,
        promoted: null,
        enPassantFlag
    };
    
    // Clear en passant flag for all pawns of the current player
    clearEnPassant(currentPlayer);
    
    // Handle en passant capture
    if (isEnPassant) {
        capturedPieces[currentPlayer].push(capturedPiece.piece);
        capturedPiece.piece = null;
        capturedPiece.element.innerHTML = '';
    }
    
    // Handle regular capture
    if (to.piece) {
        capturedPieces[currentPlayer].push(to.piece);
    }
    
    // Update piece position
    to.piece = piece;
    from.piece = null;
    to.element.innerHTML = '';
    to.element.appendChild(piece.element);
    from.element.innerHTML = '';
    
    // Update piece state
    if (piece.type === 'pawn' || piece.type === 'king' || piece.type === 'rook') {
        piece.hasMoved = true;
    }
    
    // Set en passant flag if applicable
    if (piece.type === 'pawn' && enPassantFlag) {
        piece.enPassant = true;
    }
    
    // Handle castling
    if (isCastling) {
        const { rookFrom, rookTo } = move;
        const rook = rookFrom.piece;
        
        rookTo.piece = rook;
        rookFrom.piece = null;
        rookTo.element.innerHTML = '';
        rookTo.element.appendChild(rook.element);
        rookFrom.element.innerHTML = '';
        
        rook.hasMoved = true;
    }
    
    // Handle promotion
    if (isPromotion) {
        promotionPending = { square: to, color: piece.color };
        document.getElementById('promotion-modal').style.display = 'flex';
        
        // Don't switch turns yet - wait for promotion choice
        return;
    }
    
    // Add move to history
    moveHistory.push(historyEntry);
    
    // Switch players
    switchPlayer();
    
    // Update UI
    updateUI();
    
    // Check for checkmate or stalemate
    checkGameStatus();
}

// Handle pawn promotion
function handlePromotion(event) {
    if (!promotionPending) return;
    
    const promotionType = event.currentTarget.dataset.piece;
    const { square, color } = promotionPending;
    
    // Remove pawn
    square.piece = null;
    square.element.innerHTML = '';
    
    // Create new piece
    createPiece(promotionType, color, getRowFromPosition(square.position), getColFromPosition(square.position));
    
    // Update move history to include promotion info
    const lastMove = moveHistory[moveHistory.length - 1] || {};
    lastMove.promoted = promotionType;
    
    // Close modal
    document.getElementById('promotion-modal').style.display = 'none';
    promotionPending = null;
    
    // Switch players (delayed from makeMove)
    switchPlayer();
    
    // Update UI
    updateUI();
    
    // Check for checkmate or stalemate
    checkGameStatus();
}

// Clear en passant flag for all pawns of a specific color
function clearEnPassant(color) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col].piece;
            if (piece && piece.type === 'pawn' && piece.color === color) {
                piece.enPassant = false;
            }
        }
    }
}

// Switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
}

// Check if a position is valid on the board
function isValidPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Check if a king would be in check after a move
function wouldBeInCheck(move, kingColor) {
    // Create a temporary board state
    const tempBoard = JSON.parse(JSON.stringify(board.map(row => row.map(square => ({
        position: square.position,
        piece: square.piece ? { ...square.piece } : null
    })))));
    
    // Apply the move
    const fromRow = getRowFromPosition(move.from.position);
    const fromCol = getColFromPosition(move.from.position);
    const toRow = getRowFromPosition(move.to.position);
    const toCol = getColFromPosition(move.to.position);
    
    tempBoard[toRow][toCol].piece = tempBoard[fromRow][fromCol].piece;
    tempBoard[fromRow][fromCol].piece = null;
    
    // Handle en passant capture
    if (move.isEnPassant) {
        const capturedRow = getRowFromPosition(move.capturedPiece.position);
        const capturedCol = getColFromPosition(move.capturedPiece.position);
        tempBoard[capturedRow][capturedCol].piece = null;
    }
    
    // Handle castling
    if (move.isCastling) {
        const rookFromRow = getRowFromPosition(move.rookFrom.position);
        const rookFromCol = getColFromPosition(move.rookFrom.position);
        const rookToRow = getRowFromPosition(move.rookTo.position);
        const rookToCol = getColFromPosition(move.rookTo.position);
        
        tempBoard[rookToRow][rookToCol].piece = tempBoard[rookFromRow][rookFromCol].piece;
        tempBoard[rookFromRow][rookFromCol].piece = null;
    }
    
    // Find the king's position
    let kingRow, kingCol;
    if (move.from.piece && move.from.piece.type === 'king' && move.from.piece.color === kingColor) {
        kingRow = toRow;
        kingCol = toCol;
    } else {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = tempBoard[r][c].piece;
                if (piece && piece.type === 'king' && piece.color === kingColor) {
                    kingRow = r;
                    kingCol = c;
                    break;
                }
            }
            if (kingRow !== undefined) break;
        }
    }
    
    // Check if the king is under attack
    return isSquareUnderAttack(tempBoard, kingRow, kingCol, kingColor);
}

// Check if a square is under attack
function isSquareUnderAttack(boardState, row, col, ownColor) {
    const oppositeColor = ownColor === 'white' ? 'black' : 'white';
    
    // Check for attacks by pawns
    const pawnDirection = ownColor === 'white' ? 1 : -1;
    const pawnAttacks = [
        [pawnDirection, -1],
        [pawnDirection, 1]
    ];
    
    for (const [rowOffset, colOffset] of pawnAttacks) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        
        if (isValidPosition(newRow, newCol)) {
            const piece = boardState[newRow][newCol].piece;
            if (piece && piece.type === 'pawn' && piece.color === oppositeColor) {
                return true;
            }
        }
    }
    
    // Check for attacks by knights
    const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    
    for (const [rowOffset, colOffset] of knightMoves) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        
        if (isValidPosition(newRow, newCol)) {
            const piece = boardState[newRow][newCol].piece;
            if (piece && piece.type === 'knight' && piece.color === oppositeColor) {
                return true;
            }
        }
    }
    
    // Check for attacks by bishops, rooks, queens, and king
    const directions = {
        straight: [[-1, 0], [1, 0], [0, -1], [0, 1]],
        diagonal: [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    };
    
    // Check straight lines (rook, queen)
    for (const [rowDir, colDir] of directions.straight) {
        for (let i = 1; i < 8; i++) {
            const newRow = row + rowDir * i;
            const newCol = col + colDir * i;
            
            if (!isValidPosition(newRow, newCol)) break;
            
            const piece = boardState[newRow][newCol].piece;
            if (piece) {
                if (piece.color === oppositeColor && 
                    (piece.type === 'rook' || piece.type === 'queen')) {
                    return true;
                }
                break;
            }
        }
    }
    
    // Check diagonals (bishop, queen)
    for (const [rowDir, colDir] of directions.diagonal) {
        for (let i = 1; i < 8; i++) {
            const newRow = row + rowDir * i;
            const newCol = col + colDir * i;
            
            if (!isValidPosition(newRow, newCol)) break;
            
            const piece = boardState[newRow][newCol].piece;
            if (piece) {
                if (piece.color === oppositeColor && 
                    (piece.type === 'bishop' || piece.type === 'queen')) {
                    return true;
                }
                break;
            }
        }
    }
    
    // Check for attacks by enemy king (1 square in any direction)
    const kingMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    
    for (const [rowOffset, colOffset] of kingMoves) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        
        if (isValidPosition(newRow, newCol)) {
            const piece = boardState[newRow][newCol].piece;
            if (piece && piece.type === 'king' && piece.color === oppositeColor) {
                return true;
            }
        }
    }
    
    return false;
}

// Check if a king is in check
function isKingInCheck(color) {
    const king = kings[color];
    const kingRow = getRowFromPosition(king.position);
    const kingCol = getColFromPosition(king.position);
    
    return isSquareUnderAttack(board, kingRow, kingCol, color);
}

// Check for checkmate or stalemate
function checkGameStatus() {
    // Check if the current player is in check
    inCheck[currentPlayer] = isKingInCheck(currentPlayer);
    
    // Check if there are any valid moves for the current player
    let hasValidMoves = false;
    
    outerLoop:
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col].piece;
            if (piece && piece.color === currentPlayer) {
                const moves = getValidMoves(board[row][col]);
                if (moves.length > 0) {
                    hasValidMoves = true;
                    break outerLoop;
                }
            }
        }
    }
    
    // Update UI to show check status
    const kingSquare = kings[currentPlayer];
    if (inCheck[currentPlayer]) {
        kingSquare.element.classList.add('check');
    } else {
        kingSquare.element.classList.remove('check');
    }
    
    // Game over conditions
    if (!hasValidMoves) {
        gameOver = true;
        if (inCheck[currentPlayer]) {
            // Checkmate
            showMessage(`Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} wins!`);
        } else {
            // Stalemate
            showMessage('Stalemate! The game is a draw.');
        }
        
        // Stop the timer
        stopTimer();
    } else if (inCheck[currentPlayer]) {
        showMessage(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} is in check!`);
    } else {
        showMessage('');
    }
}

// Highlight valid moves
function highlightValidMoves(moves) {
    moves.forEach(move => {
        if (move.to.piece) {
            highlightSquare(move.to.element, 'valid-capture');
        } else {
            highlightSquare(move.to.element, 'valid-move');
        }
    });
}

// Highlight a square with a specific class
function highlightSquare(element, className) {
    element.classList.add(className);
}

// Clear all highlights from the board
function clearHighlights() {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.remove('selected', 'valid-move', 'valid-capture');
    });
}

// Undo the last move
function undoMove() {
    if (moveHistory.length === 0 || gameOver || promotionPending) return;
    
    const lastMove = moveHistory.pop();
    const { piece, from, to, captured, isCastling, isEnPassant, capturedPawn, capturedPawnPos, promoted } = lastMove;
    
    // Get the squares
    const fromSquare = getSquareFromPosition(from);
    const toSquare = getSquareFromPosition(to);
    
    // Move piece back
    fromSquare.piece = toSquare.piece;
    if (promoted) {
        // If the piece was promoted, change it back to a pawn
        fromSquare.piece.type = 'pawn';
        const pieceUnicodes = {
            white: { pawn: '♙' },
            black: { pawn: '♟' }
        };
        fromSquare.piece.element.textContent = pieceUnicodes[fromSquare.piece.color].pawn;
    }
    
    toSquare.piece = captured;
    
    // Update DOM
    fromSquare.element.innerHTML = '';
    if (fromSquare.piece) {
        fromSquare.element.appendChild(fromSquare.piece.element);
    }
    
    toSquare.element.innerHTML = '';
    if (toSquare.piece) {
        toSquare.element.appendChild(toSquare.piece.element);
    }
    
    // Handle castling
    if (isCastling) {
        const direction = getColFromPosition(to) > getColFromPosition(from) ? 1 : -1;
        const rookFromCol = direction === 1 ? 5 : 3;
        const rookToCol = direction === 1 ? 7 : 0;
        const row = getRowFromPosition(from);
        
        const rookFromSquare = board[row][rookFromCol];
        const rookToSquare = board[row][rookToCol];
        
        rookToSquare.piece = rookFromSquare.piece;
        rookFromSquare.piece = null;
        
        rookToSquare.element.innerHTML = '';
        if (rookToSquare.piece) {
            rookToSquare.element.appendChild(rookToSquare.piece.element);
            rookToSquare.piece.hasMoved = false;
        }
        rookFromSquare.element.innerHTML = '';
    }
    
    // Handle en passant
    if (isEnPassant) {
        const capturedSquare = getSquareFromPosition(capturedPawnPos);
        capturedSquare.piece = capturedPawn;
        
        capturedSquare.element.innerHTML = '';
        if (capturedSquare.piece) {
            capturedSquare.element.appendChild(capturedSquare.piece.element);
        }
        
        // Remove from captured pieces
        const lastIndex = capturedPieces[currentPlayer === 'white' ? 'black' : 'white'].length - 1;
        capturedPieces[currentPlayer === 'white' ? 'black' : 'white'].splice(lastIndex, 1);
    } else if (captured) {
        // Remove from captured pieces
        const lastIndex = capturedPieces[currentPlayer === 'white' ? 'black' : 'white'].length - 1;
        capturedPieces[currentPlayer === 'white' ? 'black' : 'white'].splice(lastIndex, 1);
    }
    
    // Restore piece state
    fromSquare.piece.hasMoved = false;
    
    // Switch player back
    switchPlayer();
    
    // Clear check state
    document.querySelectorAll('.check').forEach(element => {
        element.classList.remove('check');
    });
    inCheck = { white: false, black: false };
    
    // Game is not over
    gameOver = false;
    
    // Update UI
    updateUI();
    showMessage('');
}

// Restart the game
function restartGame() {
    // Reset game state
    selectedPiece = null;
    currentPlayer = 'white';
    moveHistory = [];
    capturedPieces = { white: [], black: [] };
    kings = { white: null, black: null };
    inCheck = { white: false, black: false };
    gameOver = false;
    promotionPending = null;
    
    // Reset timer
    timers.white = 600;
    timers.black = 600;
    timers.active = false;
    if (timers.interval) {
        clearInterval(timers.interval);
        timers.interval = null;
    }
    
    // Recreate board and pieces
    createBoard();
    initializePieces();
    
    // Update UI
    updateUI();
    showMessage('');
}

// Start the game timer
function startTimer() {
    if (timers.active) return;
    
    timers.active = true;
    timers.interval = setInterval(() => {
        if (gameOver) {
            stopTimer();
            return;
        }
        
        timers[currentPlayer]--;
        if (timers[currentPlayer] <= 0) {
            timers[currentPlayer] = 0;
            gameOver = true;
            showMessage(`Time's up! ${currentPlayer === 'white' ? 'Black' : 'White'} wins!`);
            stopTimer();
        }
        
        updateTimerDisplay();
    }, 1000);
}

// Stop the game timer
function stopTimer() {
    if (timers.interval) {
        clearInterval(timers.interval);
        timers.interval = null;
    }
    timers.active = false;
}

// Update the timer display
function updateTimerDisplay() {
    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    document.getElementById('white-timer').textContent = formatTime(timers.white);
    document.getElementById('black-timer').textContent = formatTime(timers.black);
}

// Update UI elements
function updateUI() {
    // Update turn indicator
    document.getElementById('current-turn').textContent = 
        `${currentPlayer === 'white' ? '👤' : '⚫'} ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
    
    // Update captured pieces
    updateCapturedPieces();
    
    // Update move history
    updateMoveHistory();
    
    // Update timer display
    updateTimerDisplay();
}

// Update captured pieces display
function updateCapturedPieces() {
    const whiteCapturedElement = document.getElementById('white-captured');
    const blackCapturedElement = document.getElementById('black-captured');
    
    whiteCapturedElement.innerHTML = '';
    blackCapturedElement.innerHTML = '';
    
    capturedPieces.white.forEach(piece => {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('captured-piece');
        pieceElement.textContent = piece.element.textContent;
        blackCapturedElement.appendChild(pieceElement);
    });
    
    capturedPieces.black.forEach(piece => {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('captured-piece');
        pieceElement.textContent = piece.element.textContent;
        whiteCapturedElement.appendChild(pieceElement);
    });
}

// Update move history display
function updateMoveHistory() {
    const moveHistoryElement = document.getElementById('move-history-list');
    moveHistoryElement.innerHTML = '';
    
    for (let i = 0; i < moveHistory.length; i += 2) {
        const moveNumber = Math.floor(i / 2) + 1;
        const moveNumberElement = document.createElement('div');
        moveNumberElement.classList.add('move-number');
        moveNumberElement.textContent = moveNumber + '.';
        moveHistoryElement.appendChild(moveNumberElement);
        
        const whiteMove = moveHistory[i];
        const whiteMoveElement = document.createElement('div');
        whiteMoveElement.textContent = formatChessNotation(whiteMove);
        moveHistoryElement.appendChild(whiteMoveElement);
        
        const blackMove = moveHistory[i + 1];
        const blackMoveElement = document.createElement('div');
        blackMoveElement.textContent = blackMove ? formatChessNotation(blackMove) : '';
        moveHistoryElement.appendChild(blackMoveElement);
    }
    
    // Scroll to bottom
    moveHistoryElement.scrollTop = moveHistoryElement.scrollHeight;
}

// Format move in chess notation
function formatChessNotation(move) {
    if (!move) return '';
    
    let notation = '';
    
    // Piece symbol
    switch (move.piece.type) {
        case 'king': notation += 'K'; break;
        case 'queen': notation += 'Q'; break;
        case 'rook': notation += 'R'; break;
        case 'bishop': notation += 'B'; break;
        case 'knight': notation += 'N'; break;
        // Pawns don't have a symbol in notation
    }
    
    // Capture symbol
    if (move.captured || move.isEnPassant) {
        if (move.piece.type === 'pawn') {
            notation += move.from.position[0]; // Add file for pawn captures
        }
        notation += 'x';
    }
    
    // Destination square
    notation += move.to.position;
    
    // Castling
    if (move.isCastling) {
        notation = getColFromPosition(move.to.position) > getColFromPosition(move.from.position) ? 'O-O' : 'O-O-O';
    }
    
    // Promotion
    if (move.promoted) {
        switch (move.promoted) {
            case 'queen': notation += '=Q'; break;
            case 'rook': notation += '=R'; break;
            case 'bishop': notation += '=B'; break;
            case 'knight': notation += '=N'; break;
        }
    }
    
    // Check or checkmate
    // This requires additional logic to determine, so we're simplifying for now
    
    return notation;
}

// Show a message
function showMessage(message) {
    document.getElementById('game-message').textContent = message;
}

// Helper functions for board positions
function getSquareFromPosition(position) {
    const row = getRowFromPosition(position);
    const col = getColFromPosition(position);
    return board[row][col];
}

function getSquareFromElement(element) {
    const position = element.dataset.position;
    return getSquareFromPosition(position);
}

function getRowFromPosition(position) {
    return 8 - parseInt(position[1]);
}

function getColFromPosition(position) {
    return position.charCodeAt(0) - 'a'.charCodeAt(0);
}

// Initialize game when the page loads
window.addEventListener('DOMContentLoaded', initGame);

    