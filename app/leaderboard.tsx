import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function Leaderboard() {
  const router = useRouter();

  // Selected leaderboard type
  const [leaderboardType, setLeaderboardType] = useState("global");

  // Selected game filter
  const [gameFilter, setGameFilter] = useState("all");

  // Selected time period
  const [timePeriod, setTimePeriod] = useState("weekly");

  // Mock leaderboard data
  const leaderboardData = {
    global: {
      all: [
        {
          id: 1,
          rank: 1,
          name: "AlexMaster",
          username: "alex42",
          country: "US",
          points: 9850,
          games: 145,
          avatar: null,
        },
        {
          id: 2,
          rank: 2,
          name: "SudokuQueen",
          username: "sudokuq",
          country: "JP",
          points: 9720,
          games: 132,
          avatar: null,
        },
        {
          id: 3,
          rank: 3,
          name: "GameWizard",
          username: "wizard",
          country: "DE",
          points: 9540,
          games: 128,
          avatar: null,
        },
        {
          id: 4,
          rank: 4,
          name: "PuzzleMaster",
          username: "puzzle",
          country: "UK",
          points: 9320,
          games: 156,
          avatar: null,
        },
        {
          id: 5,
          rank: 5,
          name: "BrainChamp",
          username: "brain",
          country: "CA",
          points: 9180,
          games: 139,
          avatar: null,
        },
        {
          id: 6,
          rank: 6,
          name: "LogicKing",
          username: "logic",
          country: "FR",
          points: 8950,
          games: 142,
          avatar: null,
        },
        {
          id: 7,
          rank: 7,
          name: "MindGamer",
          username: "mind",
          country: "AU",
          points: 8840,
          games: 127,
          avatar: null,
        },
        {
          id: 8,
          rank: 8,
          name: "NumberNinja",
          username: "ninja",
          country: "KR",
          points: 8720,
          games: 135,
          avatar: null,
        },
        {
          id: 9,
          rank: 9,
          name: "PuzzlePro",
          username: "pro",
          country: "BR",
          points: 8650,
          games: 130,
          avatar: null,
        },
        {
          id: 10,
          rank: 10,
          name: "GameGenius",
          username: "genius",
          country: "IN",
          points: 8540,
          games: 125,
          avatar: null,
        },
        {
          id: 11,
          rank: 11,
          name: "MasterMind",
          username: "master",
          country: "ES",
          points: 8430,
          games: 138,
          avatar: null,
        },
        {
          id: 12,
          rank: 12,
          name: "BrainTeaser",
          username: "teaser",
          country: "IT",
          points: 8320,
          games: 129,
          avatar: null,
        },
        {
          id: 42,
          rank: 42,
          name: "John Doe",
          username: "johndoe42",
          country: "US",
          points: 5250,
          games: 124,
          isCurrentUser: true,
          avatar: null,
        },
      ],
      sudoku: [
        {
          id: 1,
          rank: 1,
          name: "SudokuQueen",
          username: "sudokuq",
          country: "JP",
          points: 4850,
          games: 78,
          avatar: null,
        },
        {
          id: 2,
          rank: 2,
          name: "GridMaster",
          username: "grid",
          country: "US",
          points: 4720,
          games: 72,
          avatar: null,
        },
        {
          id: 3,
          rank: 3,
          name: "NumberWizard",
          username: "number",
          country: "DE",
          points: 4540,
          games: 68,
          avatar: null,
        },
        {
          id: 4,
          rank: 4,
          name: "PuzzleSolver",
          username: "solver",
          country: "UK",
          points: 4320,
          games: 75,
          avatar: null,
        },
        {
          id: 5,
          rank: 5,
          name: "SudokuPro",
          username: "sudokup",
          country: "CA",
          points: 4180,
          games: 70,
          avatar: null,
        },
        {
          id: 35,
          rank: 35,
          name: "John Doe",
          username: "johndoe42",
          country: "US",
          points: 2250,
          games: 58,
          isCurrentUser: true,
          avatar: null,
        },
      ],
      minesweeper: [
        {
          id: 1,
          rank: 1,
          name: "MineExpert",
          username: "mine",
          country: "US",
          points: 3850,
          games: 62,
          avatar: null,
        },
        {
          id: 2,
          rank: 2,
          name: "BombDefuser",
          username: "bomb",
          country: "RU",
          points: 3720,
          games: 58,
          avatar: null,
        },
        {
          id: 3,
          rank: 3,
          name: "MineKing",
          username: "mineking",
          country: "DE",
          points: 3540,
          games: 55,
          avatar: null,
        },
        {
          id: 4,
          rank: 4,
          name: "FieldClearer",
          username: "field",
          country: "UK",
          points: 3320,
          games: 60,
          avatar: null,
        },
        {
          id: 5,
          rank: 5,
          name: "SweepMaster",
          username: "sweep",
          country: "CA",
          points: 3180,
          games: 57,
          avatar: null,
        },
        {
          id: 28,
          rank: 28,
          name: "John Doe",
          username: "johndoe42",
          country: "US",
          points: 1750,
          games: 42,
          isCurrentUser: true,
          avatar: null,
        },
      ],
      tictactoe: [
        {
          id: 1,
          rank: 1,
          name: "TicTacPro",
          username: "tictac",
          country: "BR",
          points: 2850,
          games: 45,
          avatar: null,
        },
        {
          id: 2,
          rank: 2,
          name: "XOChamp",
          username: "xochamp",
          country: "US",
          points: 2720,
          games: 42,
          avatar: null,
        },
        {
          id: 3,
          rank: 3,
          name: "GridGenius",
          username: "gridg",
          country: "JP",
          points: 2540,
          games: 40,
          avatar: null,
        },
        {
          id: 4,
          rank: 4,
          name: "TicMaster",
          username: "ticmaster",
          country: "FR",
          points: 2320,
          games: 38,
          avatar: null,
        },
        {
          id: 5,
          rank: 5,
          name: "XOKing",
          username: "xoking",
          country: "AU",
          points: 2180,
          games: 36,
          avatar: null,
        },
        {
          id: 15,
          rank: 15,
          name: "John Doe",
          username: "johndoe42",
          country: "US",
          points: 1250,
          games: 24,
          isCurrentUser: true,
          avatar: null,
        },
      ],
    },
    regional: {
      all: [
        {
          id: 1,
          rank: 1,
          name: "AlexMaster",
          username: "alex42",
          country: "US",
          points: 9850,
          games: 145,
          avatar: null,
        },
        {
          id: 2,
          rank: 2,
          name: "XOChamp",
          username: "xochamp",
          country: "US",
          points: 8720,
          games: 132,
          avatar: null,
        },
        {
          id: 3,
          rank: 3,
          name: "USPuzzler",
          username: "uspuzzle",
          country: "US",
          points: 7540,
          games: 128,
          avatar: null,
        },
        {
          id: 4,
          rank: 4,
          name: "StateChamp",
          username: "state",
          country: "US",
          points: 7320,
          games: 126,
          avatar: null,
        },
        {
          id: 5,
          rank: 5,
          name: "USGamer",
          username: "usgamer",
          country: "US",
          points: 7180,
          games: 122,
          avatar: null,
        },
        {
          id: 8,
          rank: 8,
          name: "John Doe",
          username: "johndoe42",
          country: "US",
          points: 5250,
          games: 124,
          isCurrentUser: true,
          avatar: null,
        },
      ],
    },
    friends: {
      all: [
        {
          id: 1,
          rank: 1,
          name: "Sarah Johnson",
          username: "sarahj",
          country: "US",
          points: 7850,
          games: 115,
          avatar: null,
        },
        {
          id: 2,
          rank: 2,
          name: "Mike Smith",
          username: "mikes",
          country: "CA",
          points: 6720,
          games: 102,
          avatar: null,
        },
        {
          id: 3,
          rank: 3,
          name: "John Doe",
          username: "johndoe42",
          country: "US",
          points: 5250,
          games: 124,
          isCurrentUser: true,
          avatar: null,
        },
        {
          id: 4,
          rank: 4,
          name: "Emma Wilson",
          username: "emmaw",
          country: "UK",
          points: 4320,
          games: 98,
          avatar: null,
        },
        {
          id: 5,
          rank: 5,
          name: "David Brown",
          username: "davidb",
          country: "AU",
          points: 3180,
          games: 85,
          avatar: null,
        },
      ],
    },
  };

  // Get the appropriate leaderboard data based on filters
  const getLeaderboardData = () => {
    if (leaderboardType === "global") {
      return gameFilter === "all"
        ? leaderboardData.global.all
        : leaderboardData.global[gameFilter];
    } else if (leaderboardType === "regional") {
      return leaderboardData.regional.all;
    } else {
      return leaderboardData.friends.all;
    }
  };

  // Find the current user in the leaderboard
  const currentUser = getLeaderboardData().find((user) => user.isCurrentUser);

  // Country flag emoji mapping
  const countryFlags = {
    US: "🇺🇸",
    JP: "🇯🇵",
    DE: "🇩🇪",
    UK: "🇬🇧",
    CA: "🇨🇦",
    FR: "🇫🇷",
    AU: "🇦🇺",
    KR: "🇰🇷",
    BR: "🇧🇷",
    IN: "🇮🇳",
    ES: "🇪🇸",
    IT: "🇮🇹",
    RU: "🇷🇺",
  };

  // Game icon mapping
  const gameIcons = {
    all: (
      <MaterialCommunityIcons
        name="gamepad-variant"
        size={20}
        color="#4f46e5"
      />
    ),
    sudoku: <MaterialCommunityIcons name="grid" size={20} color="#4f46e5" />,
    minesweeper: <FontAwesome5 name="bomb" size={18} color="#4f46e5" />,
    tictactoe: (
      <MaterialCommunityIcons
        name="close-box-outline"
        size={20}
        color="#4f46e5"
      />
    ),
  };

  // Render a leaderboard item
  const renderLeaderboardItem = ({ item, index }) => {
    const isCurrentUser = item.isCurrentUser;

    return (
      <View
        className={`flex-row items-center p-4 ${
          index < getLeaderboardData().length - 1
            ? "border-b border-slate-100"
            : ""
        } ${isCurrentUser ? "bg-indigo-50" : ""}`}
      >
        {/* Rank */}
        <View className="w-10">
          {item.rank <= 3 ? (
            <View
              className={`
              w-8 h-8 rounded-full items-center justify-center
              ${
                item.rank === 1
                  ? "bg-amber-400"
                  : item.rank === 2
                  ? "bg-slate-300"
                  : "bg-amber-700"
              }
            `}
            >
              <Text className="font-bold text-white">{item.rank}</Text>
            </View>
          ) : (
            <Text className="text-slate-500 font-medium text-center">
              {item.rank}
            </Text>
          )}
        </View>

        {/* User Info */}
        <View className="flex-1 flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
            {item.avatar ? (
              <Image
                source={{ uri: item.avatar }}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <Text className="text-indigo-600 font-bold">
                {item.name.charAt(0)}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <View className="flex-row items-center">
              <Text
                className={`font-medium ${
                  isCurrentUser ? "text-indigo-600" : "text-slate-800"
                }`}
              >
                {item.name}
              </Text>
              {isCurrentUser && (
                <View className="ml-2 bg-indigo-100 px-2 py-0.5 rounded-full">
                  <Text className="text-xs text-indigo-600">You</Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center">
              <Text className="text-xs text-slate-500">@{item.username}</Text>
              <Text className="mx-1 text-xs text-slate-300">•</Text>
              <Text className="text-xs">
                {countryFlags[item.country] || item.country}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="items-end">
          <Text className="font-bold text-slate-800">{item.points}</Text>
          <Text className="text-xs text-slate-500">{item.games} games</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-slate-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">Leaderboard</Text>
          <TouchableOpacity className="ml-auto">
            <Feather name="refresh-cw" size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        {/* Leaderboard Type Selector */}
        <View className="px-4 py-4">
          <View className="flex-row bg-white rounded-lg shadow-sm p-1">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                leaderboardType === "global" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setLeaderboardType("global")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  leaderboardType === "global"
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Global
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                leaderboardType === "regional" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setLeaderboardType("regional")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  leaderboardType === "regional"
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Regional
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-md ${
                leaderboardType === "friends" ? "bg-indigo-100" : ""
              }`}
              onPress={() => setLeaderboardType("friends")}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  leaderboardType === "friends"
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Friends
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Game Filter */}
        {leaderboardType === "global" && (
          <View className="px-4 mb-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              <View className="flex-row">
                <TouchableOpacity
                  className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${
                    gameFilter === "all" ? "bg-indigo-600" : "bg-white"
                  }`}
                  onPress={() => setGameFilter("all")}
                >
                  <MaterialCommunityIcons
                    name="gamepad-variant"
                    size={18}
                    color={gameFilter === "all" ? "white" : "#4f46e5"}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    className={`text-sm font-medium ${
                      gameFilter === "all" ? "text-white" : "text-slate-500"
                    }`}
                  >
                    All Games
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${
                    gameFilter === "sudoku" ? "bg-indigo-600" : "bg-white"
                  }`}
                  onPress={() => setGameFilter("sudoku")}
                >
                  <MaterialCommunityIcons
                    name="grid"
                    size={18}
                    color={gameFilter === "sudoku" ? "white" : "#4f46e5"}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    className={`text-sm font-medium ${
                      gameFilter === "sudoku" ? "text-white" : "text-slate-500"
                    }`}
                  >
                    Sudoku
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${
                    gameFilter === "minesweeper" ? "bg-indigo-600" : "bg-white"
                  }`}
                  onPress={() => setGameFilter("minesweeper")}
                >
                  <FontAwesome5
                    name="bomb"
                    size={16}
                    color={gameFilter === "minesweeper" ? "white" : "#4f46e5"}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    className={`text-sm font-medium ${
                      gameFilter === "minesweeper"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    Minesweeper
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`mr-2 px-4 py-2 rounded-full flex-row items-center ${
                    gameFilter === "tictactoe" ? "bg-indigo-600" : "bg-white"
                  }`}
                  onPress={() => setGameFilter("tictactoe")}
                >
                  <MaterialCommunityIcons
                    name="close-box-outline"
                    size={18}
                    color={gameFilter === "tictactoe" ? "white" : "#4f46e5"}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    className={`text-sm font-medium ${
                      gameFilter === "tictactoe"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    Tic Tac Toe
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Time Period Selector */}
        <View className="px-4 mb-4">
          <View className="flex-row justify-end">
            <TouchableOpacity
              className={`px-3 py-1 rounded-md ${
                timePeriod === "weekly" ? "bg-indigo-100" : "bg-transparent"
              }`}
              onPress={() => setTimePeriod("weekly")}
            >
              <Text
                className={`text-xs font-medium ${
                  timePeriod === "weekly" ? "text-indigo-600" : "text-slate-500"
                }`}
              >
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-1 rounded-md ${
                timePeriod === "monthly" ? "bg-indigo-100" : "bg-transparent"
              }`}
              onPress={() => setTimePeriod("monthly")}
            >
              <Text
                className={`text-xs font-medium ${
                  timePeriod === "monthly"
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-1 rounded-md ${
                timePeriod === "alltime" ? "bg-indigo-100" : "bg-transparent"
              }`}
              onPress={() => setTimePeriod("alltime")}
            >
              <Text
                className={`text-xs font-medium ${
                  timePeriod === "alltime"
                    ? "text-indigo-600"
                    : "text-slate-500"
                }`}
              >
                All Time
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top 3 Podium (for global leaderboard) */}
        {leaderboardType === "global" && getLeaderboardData().length >= 3 && (
          <View className="px-4 mb-6">
            <View className="flex-row justify-center items-end">
              {/* 2nd Place */}
              <View className="items-center z-10">
                <View className="w-16 h-16 rounded-full bg-white border-2 border-slate-300 items-center justify-center mb-1">
                  <Text className="text-xl font-bold">
                    {getLeaderboardData()[1].name.charAt(0)}
                  </Text>
                </View>
                <View className="bg-slate-300 w-24 h-20 rounded-t-lg items-center justify-center">
                  <Text className="text-white font-bold text-lg">2</Text>
                  <Text className="text-white text-xs font-medium">
                    {getLeaderboardData()[1].points}
                  </Text>
                </View>
              </View>

              {/* 1st Place */}
              <View className="items-center -mx-2 z-20">
                <View className="w-20 h-20 rounded-full bg-white border-2 border-amber-400 items-center justify-center mb-1">
                  <Text className="text-2xl font-bold">
                    {getLeaderboardData()[0].name.charAt(0)}
                  </Text>
                </View>
                <View className="bg-amber-400 w-28 h-24 rounded-t-lg items-center justify-center">
                  <Text className="text-white font-bold text-xl">1</Text>
                  <Text className="text-white text-xs font-medium">
                    {getLeaderboardData()[0].points}
                  </Text>
                </View>
              </View>

              {/* 3rd Place */}
              <View className="items-center z-10">
                <View className="w-16 h-16 rounded-full bg-white border-2 border-amber-700 items-center justify-center mb-1">
                  <Text className="text-xl font-bold">
                    {getLeaderboardData()[2].name.charAt(0)}
                  </Text>
                </View>
                <View className="bg-amber-700 w-24 h-16 rounded-t-lg items-center justify-center">
                  <Text className="text-white font-bold text-lg">3</Text>
                  <Text className="text-white text-xs font-medium">
                    {getLeaderboardData()[2].points}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Leaderboard List */}
        <View className="flex-1 px-4">
          <View className="bg-white rounded-xl shadow-sm overflow-hidden flex-1">
            {/* Header */}
            <View className="flex-row items-center p-3 border-b border-slate-100 bg-slate-50">
              <View className="w-10">
                <Text className="text-xs font-medium text-slate-500 text-center">
                  Rank
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-medium text-slate-500 ml-12">
                  Player
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs font-medium text-slate-500">
                  Points
                </Text>
              </View>
            </View>

            {/* List */}
            <FlatList
              data={getLeaderboardData()}
              renderItem={renderLeaderboardItem}
              keyExtractor={(item) => item.id.toString()}
              initialScrollIndex={
                currentUser
                  ? getLeaderboardData().findIndex((user) => user.isCurrentUser)
                  : 0
              }
              getItemLayout={(data, index) => ({
                length: 76, // Approximate height of each item
                offset: 76 * index,
                index,
              })}
            />
          </View>
        </View>

        {/* Current User Position (if not visible in the current view) */}
        {currentUser && currentUser.rank > 10 && (
          <View className="px-4 py-4">
            <View className="bg-white rounded-xl shadow-sm overflow-hidden">
              <View className="p-3 border-b border-slate-100 bg-slate-50">
                <Text className="text-xs font-medium text-slate-500">
                  Your Position
                </Text>
              </View>
              {renderLeaderboardItem({ item: currentUser })}
            </View>
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-slate-200 px-4 py-2">
        <Link href="/" asChild>
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="home-outline" size={24} color="#64748b" />
            <Text className="text-xs text-slate-500">Home</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity className="flex-1 items-center">
          <Ionicons name="trophy" size={24} color="#4f46e5" />
          <Text className="text-xs text-indigo-600 font-medium">Compete</Text>
        </TouchableOpacity>
        <Link href="/stats" asChild>
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="stats-chart-outline" size={24} color="#64748b" />
            <Text className="text-xs text-slate-500">Stats</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/settings" asChild>
          <TouchableOpacity className="flex-1 items-center">
            <Ionicons name="settings-outline" size={24} color="#64748b" />
            <Text className="text-xs text-slate-500">Settings</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
